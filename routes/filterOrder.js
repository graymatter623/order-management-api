const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const bodyParser = require('body-parser');
const checkToken = require('../token-authorization/checkToken');
router.post('/',checkToken.checkToken,bodyParser.urlencoded({extended : false}),(req,res)=>{
    Order.find({status : req.body.order_status }).then((order)=>{
        if(order) {
            console.log("Order Filtered");
            res.status(404).json({success : true, filteredOrder : order});
        }
    }).catch(error=>{
        if(error){
            res.status(404).json({success : false });    
        }
    });
});
module.exports = router;