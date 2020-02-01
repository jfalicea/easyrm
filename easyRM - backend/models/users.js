const bcrypt = require('bcryptjs')
//generate unique tokens randomly
const randToken = require('rand-token');
const db = require('../db')


async function verifyUser(email){
    const userCheckQuery = `SELECT user_email FROM users WHERE user_email = $1`
    const userExist = await db.query(userCheckQuery, [email])
    return userExist
}


function verifyAddUserForm(req, res){
    const {fname, lname, password, email} =  req.body
    //check user information. 
    if(!(fname)||!(lname)||!(password)||!(email)){
        return false
    } 
    return true
}



async function addUser(req, res){
    msg = verifyAddUserForm(req)
    console.log('_---', )
    verifyAddUserForm(req) ? res.json("Ddd") : res.status(400).json(`The infomration you provided is incorrect. Please make sure you provide all the required information.`)

    // const doesUserExist = await verifyUser(email)
    // doesUserExist.length > 0 ? res.status(400).json(`this user already exists` ): null
    
     

}



// else {
//   const insertNewUserQuery = `INSERT INTO users 
//   (user_fname, user_lname, user_email, token, password) 
//   VALUES ($1,$2,$3,$4,$5)
//   returning user_fname, user_lname, user_email, token`
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(password, salt);
//   const token = randToken.uid(50);
//   const insertUser = await db.one(insertNewUserQuery,[fname, lname, email,token,hash])
//   msg = "user added";
//   res.json({
//     fname,
//     lname,
//     token,
//     email,
//     msg
//   });
//   return
// }






module.exports = {
    addUser,

}