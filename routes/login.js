const express = require('express');
const bodyParser = require('body-parser');
const Employee = require('../models/employeeLoginSchema');
const router = express.Router();
const config = require('./token-authorization/config');
const jwt = require('jsonwebtoken');
// const fs = require('fs');
router.post('/' ,bodyParser.urlencoded({extended : false}),(req,res)=>{
    Employee.findOne({
        username : req.body.employee_username,
        password : req.body.employee_password
    },(error,emp)=>{
        if(emp){
           // console.log(emp);
            if(emp === null || emp === undefined){
                console.log('error')
            }else{
                let token = jwt.sign(
                    {
                        username : req.body.employee_username
                    } ,
                    config.secret,
                    {
                        algorithm :'HS256',
                        expiresIn : '24h'
                    }
                );
                //console.log(token);
                console.log('LOGGED IN');
                if(emp.isOwner){
                    res.json({isOwner : true , success : true,employee : emp ,token});
                }else{
                    res.json({ isOwner : false , success : true , employee : emp,token});
                }
            }
        }else{
            console.log('wrong id pass');
            res.json({success : false , message : 'Invalid ID or passsword'});
        }
    });
});
module.exports = router;
