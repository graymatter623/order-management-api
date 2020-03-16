const express = require('express');
const router = express.Router();
const Orders = require('../models/order');
 
router.get('/',require('../token-authorization/checkToken').checkToken,(req,res)=>{
    Orders.find().then((order)=>{
        res.status(200).json({orders : order , orderId : order[0]._id});
    }).catch(error =>{
        if(error){
            res.status(404).json({success : false ,error});
        }
    });
});

module.exports = router;