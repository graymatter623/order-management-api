const express = require('express');
const router = express.Router();
const Orders = require('../models/order');
 
router.get('/',require('./token-authorization/checkToken').checkToken,(req,res)=>{
    Orders.find((error,order)=>{
        if(error){
            console.log(error);
            return res.json({status : "Error Occured ", error : error});
        }
        console.log(order);
        res.json({status : "OK" , orders : order , orderId : order[0]._id});
    });
});

module.exports = router;