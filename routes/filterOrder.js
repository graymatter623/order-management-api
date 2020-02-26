const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const bodyParser = require('body-parser');
const checkToken = require('./token-authorization/checkToken');
router.post('/',checkToken.checkToken,bodyParser.urlencoded({extended : false}),(req,res)=>{
    let selectedStatus = req.body.order_status;
    Order.find({status : selectedStatus },(error,order)=>{
        if(error){
            return res.json({status :"Error Occurred" ,error : error, success : false });    
        }
        console.log(order);
        res.json({status :"OK" , success : true, filteredOrder : order});
    });
});
module.exports = router;