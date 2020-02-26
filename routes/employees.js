const express = require('express');
const Employee = require('../models/employee');
const router = express.Router();
const checkToken = require('./token-authorization/checkToken');
router.get('/',checkToken.checkToken,(req,res)=>{
    Employee.find((error,employee)=>{
        if(error){
            return res.json({status : "Error occured" , success : false});
        }
        console.log('Employees Fetched');
        res.json({status : "Ok" , success : true , employee : employee});
    });
});
module.exports = router;