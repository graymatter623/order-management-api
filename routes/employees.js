const express = require('express');
const Employee = require('../models/employee');
const router = express.Router();
const checkToken = require('../token-authorization/checkToken');
router.get('/',(req,res)=>{
    Employee.find().then((employee)=>{
        console.log('Employees Fetched');
        if(employee) res.status(200).json({success : true , employee : employee});
    }).catch(error=>{
        if(error) res.status(404).json({error, success : false});
    });
});
module.exports = router;