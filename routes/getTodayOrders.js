const express = require('express');
const router = express.Router();
const Orders = require('../models/order');
 
router.get('/',require('../token-authorization/checkToken').checkToken,(req,res)=>{
    let date = new Date(Date.now()); 
    Orders.find({orderDate : date.toDateString()}).then((order)=>{   
        console.log(order);
        res.status(200).json({success : true , order : order});
    }).catch(error=>{
        if(error){
            console.log(error);
            res.status(404).json({success : false ,error : error});
        }
    });
});

module.exports = router;