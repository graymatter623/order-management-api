const express = require('express');
const router = express.Router();
const Employees = require('../models/employee');
const bodyParser = require('body-parser');

router.post('/',bodyParser.urlencoded({extended : false}) ,(req,res)=>{
    let employeeName = req.body.name;
    Employees.find( {name : employeeName },(error,employee)=>{
        if(error){
            console.log(error);
            return res.status(500).json({error : error , status : "Employee Not Found"});
        }
        res.status(200).json({success : true, employee : employee});        
    });
});
module.exports = router;