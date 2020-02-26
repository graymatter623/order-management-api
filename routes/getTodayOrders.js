const express = require('express');
const router = express.Router();
const Orders = require('../models/order');
 
router.get('/',require('./token-authorization/checkToken').checkToken,(req,res)=>{
    let date = new Date(Date.now()); 
    Orders.find({orderDate : date.toDateString()},(error,order)=>{
        if(error){
            console.log(error);
            return res.json({status : "Error Occured ", error : error});
        }   
        console.log(order);
        res.json({status : "OK" , order : order});
    });
});

module.exports = router;