const express = require('express');
const EmployeeSchema = require('../models/employee');
const OrderSchema = require('../models/order');
const router = express.Router();
const checkToken = require('./token-authorization/checkToken');
router.get('/:orderId/:employeeId',checkToken.checkToken,(req,res)=>{
    const orderId = req.params.orderId;
    const employeeId = req.params.employeeId;
    console.log(orderId,employeeId);
    OrderSchema.findOne({_id : orderId},(error,order)=>{
        EmployeeSchema.findOneAndUpdate( {
            _id : req.params.employeeId
        },{
            isAvailable : false,
            current_order_id : orderId 
        },(error,employee)=>{
            if(error){
                console.log(error);
                return res.status(500).json({error : error ,success : false});
            }
            
            res.status(200).json({employee : employee , success: true});
        });
    });
});
module.exports = router;