var express = require('express');
var router = express.Router();
const db = require('../db')
/*
*-------------------------------------------------
** GET VENDOR INFO
*-------------------------------------------------
*/
router.get('/', async(req,res,next)=>{
    const getAllVendorQuery = `SELECT * FROM vendors`
    const queryResult = await db.query(getAllVendorQuery);
    res.json(queryResult)
});

/*
*-------------------------------------------------
** GET specific vendor 
*-------------------------------------------------
*/
router.get('/:id/', async(req, res, next)=>{
    const vendorId = parseInt(req.params.id)
    const getSpecificVendorQuery = `SELECT * FROM vendors WHERE id =$1`
    const specificVendor = await db.any(getSpecificVendorQuery,[vendorId])
    if(specificVendor.length===0){
        res.json('This vendor does not exist.')
    }
    res.json(specificVendor)
});

/*
*-------------------------------------------------
** POST a vendor
*-------------------------------------------------
*/


router.post('/', async (req, res, next)=>{
    let msg 
    const {vendorName, address, address1, city,state, zipcode, vendorContactPerson, vendorPhoneNumber, vendorFaxNumber} = req.body
    //Ensures that a vendor name is added. 
    if(!(vendorName)){
        res.json('Vendor Name is required!')
    }
    const insertVendorInfo = `INSERT INTO vendors (vendor_name, vendor_address, vendor_address_1, city, state, zipcode, sales_contact, vendor_phone_number, vendor_fax_number)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning id`
    try {
        const vendorInputSuccess = await db.query(insertVendorInfo, [vendorName,address,address1,city,state,zipcode,vendorContactPerson, vendorPhoneNumber, vendorFaxNumber])
        if(vendorInputSuccess.length>0){
            msg = 'Your vendor has been inputted successfully.'
            res.json(msg)
        }
    } catch (error) {
        console.log('POST /', error )
        msg = 'something went wrong, please try again later.'
        res.json(msg)
    }   
    
});

router.put('/:id', async (req, res, next)=>{
    const {vendorName, address, address1, city,state, zipcode, vendorContactPerson, vendorPhoneNumber, vendorFaxNumber} = req.body
    const vendorId = parseInt(req.params.id) 
    const UpdateVendorQuery = `UPDATE vendors SET vendor_name=$1, vendor_address=$2, vendor_address_1=$3, city=$4, state=$5, zipcode=$6, sales_contact=$7, vendor_phone_number=$8, vendor_fax_number=$9 WHERE id=$10`
    const updatedUser = await db.query(UpdateVendorQuery,[vendorName, address, address1, city,state, zipcode, vendorContactPerson, vendorPhoneNumber, vendorFaxNumber,vendorId])
    console.log(updatedUser)
    res.json(`${vendorName} was updated!`)
});



module.exports = router;