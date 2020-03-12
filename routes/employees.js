const express = require('express');
const Employee = require('../models/employee');
const router = express.Router();
const checkToken = require('./token-authorization/checkToken');
router.get('/',checkToken.checkToken,(req,res)=>{
    Employee.find((error,employee)=>{
        console.log('Employees Fetched');
        if(error){
            return res.status(500).json({error, success : false});
        }
        res.status(200).json({success : true , employee : employee});
    });
});
module.exports = router;