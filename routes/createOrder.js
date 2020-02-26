const express = require('express');
const Order = require('../models/order.js');
const bodyParser = require('body-parser');
const router = express.Router();
const checkToken = require('./token-authorization/checkToken');
router.post('/',checkToken.checkToken,bodyParser.urlencoded({extended : true}),(req,res)=>{
    let d = new Date(Date.now());
    const order = new Order({
        orderTitle : req.body.order_title,
        orderDate : d.toDateString(),
        startTime : d.getHours()+':'+ d.getMinutes()+':'+ d.getSeconds(),
        status : 'PENDING'
    });
    console.log("ORder created ");
    order.save();
    res.json({orderId : order._id , status : 'OK' , success : true , order : order});
});
module.exports = router;