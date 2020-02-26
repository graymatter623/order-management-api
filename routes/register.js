const express = require('express');
const bodyParser = require('body-parser');
const EmployeeLogin = require('../models/employeeLoginSchema');
const Employee = require('../models/employee');
const router = express.Router();

router.post('/',bodyParser.urlencoded({extended : false}),(req,res)=>{
    console.log('ROUTE TO Register');
    let employee = EmployeeLogin.findOne({ 
        username : req.body.employee_username,
        isOwner : false
    },(error,emp)=>{
        //console.log(emp);
        if(emp){
            res.json({ success : false ,message : 'User already Exists'});
        }else{
            let pattern = /admin/i;
            let isOwner = false;
            let isAvailable = true;
            if(pattern.test(req.body.employee_username)){
                isOwner = true;
                isAvailable = false;
            }
            const date = Date.now();
            console.log("Register Successfull");
            console.log(req.body);
            employeeLogin = new EmployeeLogin({
                username: req.body.employee_username,
                password : req.body.employee_password,
                name : req.body.employee_name,
                isOwner : isOwner
            });
            let employee = new Employee({
                isAvailable : isAvailable,
                username : req.body.employee_username,
                name : req.body.employee_name,
                current_order_id : null
            });
            employee.save();
            employeeLogin.save();
            res.json({status : "Registered" , success : true });
        }
    });   
});

module.exports = router;