const express = require('express');
const router = express.Router();
const EmployeeSchema = require('../models/employee');
const bodyParser = require('body-parser');
const checkToken = require('../token-authorization/checkToken');
router.get('/',checkToken.checkToken,bodyParser.urlencoded({extended : false}),(req,res)=>{
    let newEmployee = new EmployeeSchema({
        username : req.body.employee_username,
        name : req.body.employee_name,
        isAvailable : true,
        isOwner : false
    });
    newEmployee.save().then(response =>{
        console.log("Employee Created");
        res.status(200).json({success : true , employee : newEmployee });
    }).catch(error=>{
        res.json( {success : false , error})
    });
});
module.exports = router;