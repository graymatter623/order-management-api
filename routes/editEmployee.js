const express = require('express');
const router = express.Router();
const EmployeeSchema = require('../models/employee');
const bodyParser = require('body-parser');
const checkToken = require('./token-authorization/checkToken');
router.post('/:employeeId',checkToken.checkToken,bodyParser.urlencoded({ extended : true }),(req,res)=>{
    EmployeeSchema.findOneAndUpdate( { _id : req.params.employeeId },{
        $set:{
            name : req.body.employee_name,
            isAvailable : JSON.parse(req.body.employee_available)        
        }   
    },(error,employee)=>{
        if(error){
            console.log(error);
            res.status(422).json({success : false, error : error});
        }
        console.log('Employee Updated');
        res.status(200).json({success : true , employee : employee });
    });
});
module.exports = router;