const EmployeeLogin = require('../models/employeeLoginSchema');
const Employee = require('../models/employee');
const {validate , registerValidationRules} = require('./validator/validation');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const router = express.Router();
router.post(
    '/',
    registerValidationRules(),
    validate,
    bodyParser.urlencoded({extended : false}),
(req,res)=>{
    console.log('ROUTE TO Register');
    EmployeeLogin.findOne({ 
        username : req.body.employee_username,
        isOwner : false
    },(error,emp)=>{
        if(emp){
            res.json({ success : false ,message : 'User already Exists'});
        }else{
            bcrypt.hash(req.body.employee_password , 10).then((hash)=>{
                let pattern = /admin/i;
                let isOwner = false;
                let isAvailable = true;
                if(pattern.test(req.body.employee_username)){
                    isOwner = true;
                    isAvailable = false;
                }
                let employee = new Employee({
                    isAvailable : isAvailable,
                    username : req.body.employee_username,
                    name : req.body.employee_name,
                    current_order_id : null
                });
                employeeLogin = new EmployeeLogin({
                    username: req.body.employee_username,
                    name : req.body.employee_name,
                    password : hash,
                    isOwner : isOwner
                });
                employee.save();
                employeeLogin.save();
                res.json({status : "Registered" , success : true });
                console.log("Register Successfull");
            });
        }
    });   
});

module.exports = router;