var express = require('express');
var router = express.Router();
  //hash and salt passwords
const bcrypt = require('bcryptjs')
  //generate unique tokens randomly
const randToken = require('rand-token');
const db = require('../db')



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addUser', async (req, res, next)=>{
  const {fname, lname, password, email} =  req.body
  
  let msg 
  //check request for required fields
  if(!(fname)||!(lname)||!(password)||!(email)){
    msg =  `The information you provided is incomplete.`
    res.json(msg)
    return
  }
  //check if user exists 
  const userCheckQuery = `SELECT user_email FROM users WHERE user_email = $1`
  const userExist = await db.query(userCheckQuery, [email])
  if(userExist.length > 0){
    msg = "a user with this email already exists"
    res.json(msg)
    return 
  }
  else {
    const insertNewUserQuery = `INSERT INTO users 
    (user_fname, user_lname, user_email, token, password) 
    VALUES ($1,$2,$3,$4,$5)
    returning user_fname, user_lname, user_email, token`
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const token = randToken.uid(50);
    const insertUser = await db.one(insertNewUserQuery,[fname, lname, email,token,hash])
    msg = "user added";
    res.json({
      fname,
      lname,
      token,
      email,
      msg
    });
    return
  }
 });

/*
*-------------------------------------------------
** LOGIN AND UPDATE TOKEN
*-------------------------------------------------
*/
 router.post('/login', async(req, res, next)=>{
  const {email, password} = req.body;
  let msg   
  const getUserQuery = `SELECT * FROM users WHERE user_email = $1`
  //check if provided email exists 
  const checkUser = await db.query(getUserQuery, [email])
  if(checkUser.length>0){
  //check if password is correct 
    const loginUser = checkUser[0];
    const validPass = bcrypt.compareSync(password, loginUser.password);
    if(validPass){
      msg = 'Success! You\'ve been logged in'
      const token = randToken.uid(50)
      db.none(`UPDATE users SET token = $1 WHERE user_email = $2`, [token, loginUser.user_email])
      res.json({
        msg,
        userInfo: {
          name:`${loginUser.user_fname} ${loginUser.user_lname}`, 
          authToken: token, 
          email: loginUser.user_email
        }
      })
      return
    } else{
      msg = 'Either the email or PASSWORD, or both, are incorrect.  Error Code: LI002'
      res.json({msg})
    }
  }else{
    msg = 'Either the EMAIL or password, or both, are incorrect. Error Code: LI001'
    res.json({msg})  
  }
});

/*
*-------------------------------------------------
** get token for verification 
*-------------------------------------------------
*/
router.post('/getToken', async (req, res, next)=>{
  let msg 
  const getTokenQuery = `SELECT token FROM users WHERE user_email = $1`
  const {email} = req.body
  const token = await db.query(getTokenQuery, [email])
  res.json({
    token
  })
})

module.exports = router;
