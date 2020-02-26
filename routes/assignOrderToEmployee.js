const express = require('express');
const EmployeeSchema = require('../models/employee');
const OrderSchema = require('../models/order');
const router = express.Router();
const checkToken = require('./token-authorization/checkToken');
router.post('/:orderId',checkToken.checkToken,(req,res)=>{
    const orderId = req.params.orderId;
    console.log(orderId);
    OrderSchema.findOne({_id : orderId},(error,order)=>{
        EmployeeSchema.findOneAndUpdate( {
            isAvailable : true
        } ,{
            isAvailable : false ,
            current_order_id : orderId 
        },(error,employee)=>{
            if(error){
                console.log(error);
                return res.json({error : error , status : "Cannot Update"});
            }
            console.log(employee);
            res.json({employee : employee , status : "OK"});
        });
    });
    // const employeeId = req.params.employeeId;
    // EmployeeSchema.findOne({ isAvailable : true },(error,employee)=>{
    //     OrderSchema.findOne({ _id : orderId } , (error,order)=>{
    //         if(error){
    //             console.log('Could not find Order');
    //             res.json({success : false , status : "order not found"});
    //         }
    //         EmployeeSchema.update({isAvailable : true } ,{
    //             $set : { 
    //                 isAvailable : false ,
    //                 current_order_id : orderId
    //             }
    //         });
    //         res.json({status : "ASSIGNED" , success : true });
    //     });
    // });
     
});
module.exports = router;