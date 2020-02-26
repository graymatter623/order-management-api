const express = require('express');
const router = express.Router();
const EmployeeSchema = require('../models/employee');
const bodyParser = require('body-parser');
const checkToken = require('./token-authorization/checkToken');
router.delete('/',checkToken.checkToken,bodyParser.urlencoded({extended : false}),(req,res)=>{
    EmployeeSchema.findOneAndDelete({ name : req.body.employee_name},(error,employee)=>{
        if(error){
            res.json({status : "Error Occured",error : error});
        }
        res.json({status : "ADDED", employee : employee});
    });
});
module.exports = router;