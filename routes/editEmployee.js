const express = require('express');
const router = express.Router();
const EmployeeSchema = require('../models/employee');
const bodyParser = require('body-parser');
const checkToken = require('./token-authorization/checkToken');
router.put('/:employee-id',checkToken.checkToken,bodyParser.urlencoded({ extended : false }),(req,res)=>{
    EmployeeSchema.findOneAndUpdate( { _id : req.body.employee_id },{
        $set:{
            name : req.body.employee_name,
            isAvailable : req.body.employee_available        
        }   
    },(error,employee)=>{
        if(error){
            return res.json({status : "Error Occured" , error : error});
        }
        res.json({status : "OK", employee : employee });
    });
});
module.exports = router;