const express = require('express');
const router = express.Router();
const Logs = require('../models/logs');
const bodyParser = require('body-parser');
const checkToken = require('./token-authorization/checkToken');
const { validate , filterLogValidationRules}= require('./validator/validation.js');
router.post(
    '/' ,
    checkToken.checkToken,
    filterLogValidationRules(),
    validate,
    bodyParser.urlencoded({extended : true}),
    (req,res)=>{
    const filterType=req.body.filterType;
    const filterDate=req.body.filterDate;
    const isoDate = new Date(filterDate).toISOString();
    if(filterType === "BY_DATE"){
        Logs.find({ createdAt : { $gte : isoDate }},(error,logs)=>{
            if(error){
                res.status(404).json({success : false});
            }else{
                res.status(200).json({success : true , logs : logs});
            }
        });
    }else if(filterType === "BY_HOURS"){
        Logs.find({} ,(error,logs)=>{
            if(error){
                res.status(404).json({success : false });
            }else{
                res.json({success: true , logs : logs});
            }
        })
    }
});
module.exports = router;