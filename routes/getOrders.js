const express = require('express');
const router = express.Router();
const Orders = require('../models/order');
 
router.get('/',require('./token-authorization/checkToken').checkToken,(req,res)=>{
    Orders.find((error,order)=>{
        if(error){
            console.log(error);
            return res.json({status : "Error Occured ", error : error});
        }
        
        res.json({status : "OK" , orders : order});
    });
});

module.exports = router;