const express = require('express');
const router = express.Router();
const Employees = require('../models/employee');
const bodyParser = require('body-parser');

router.post('/',bodyParser.urlencoded({extended : false}) ,(req,res)=>{
    Employees.find( {name : req.body.name }).then((employee)=>{
        res.status(200).json({success : true,employee});        
    }).catch(error =>{
        if(error){
            res.status(500).json({error, message : "Employee Not Found"});
        }
    });
});
module.exports = router;