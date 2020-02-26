const express = require('express');
const router = express.Router();
const EmployeeSchema = require('../models/employee');
const bodyParser = require('body-parser');
const checkToken = require('./token-authorization/checkToken');
router.get('/:employeeId',checkToken.checkToken,bodyParser.urlencoded({extended : false}),(req,res)=>{
    const employeeId = req.params.employeeId;
    EmployeeSchema.findOneAndDelete({ _id : employeeId},(error,employee)=>{
        console.log('EmployeeDeleted');
        if(error){
            res.json({status : "Error Occured",error : error});
        }
        res.json({status : "deleted", employee : employee});
    });
});
module.exports = router;