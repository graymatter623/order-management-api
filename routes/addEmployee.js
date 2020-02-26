const express = require('express');
const router = express.Router();
const EmployeeSchema = require('../models/employee');
const bodyParser = require('body-parser');
const checkToken = require('./token-authorization/checkToken');
router.get('/',checkToken.checkToken,bodyParser.urlencoded({extended : false}),(req,res)=>{
    let newEmployee = new EmployeeSchema({
        username : req.body.employee_username,
        name : req.body.employee_name,
        isAvailable : true,
        isOwner : false
    });
    newEmployee.save();
    res.json({status : "ADDED", employee : newEmployee });
});
module.exports = router;