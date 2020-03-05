const express = require('express');
const Employee = require('../models/employee');
const router = express.Router();
const checkToken = require('./token-authorization/checkToken');
router.get('/',checkToken.checkToken,(req,res)=>{
    Employee.find((error,employee)=>{
        console.log('Employees Fetched');
        if(error){
            return res.json({status : "Error occured" , success : false});
        }
        res.json({status : "Ok" , success : true , employee : employee});
    });
});
module.exports = router;