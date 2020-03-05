const Logs = require('../models/logs');
const {validate,logsValidationRules} = require('./validator/validation');
const express =require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
router.post(
    '/',
    logsValidationRules(),
    validate,
    bodyParser.urlencoded({extended : false}),
(req,res)=>{
    let from = req.body.from;
    let to = req.body.to;
    let createdAt =  req.body.createdAt;
    const log = new Logs({
        from : from,
        to : to,
        createdAt : createdAt,
    });
    log.save((error,response)=>{
        if(error){
            console.log(error);
            res.status(422).json({error : {
                message : "Cannot Create log"
            }});
        }else{
        //     const now = new Date(Date.now());
        //     const today = now.getDay()+"-"+now.getMonth()+"-"+now.getFullYear();
        //     const data= `from-${from} to-${to} ${createdAt}`;
        //    // console.log(__dirname);
        //     fs.appendFile(`../logs/${today}.log`,data,(error)=>{
        //         if(error)console.error('Cannot open file');
        //     });
            res.status(200).json({success : true ,message : "Logs created"});
        }
    });

});

module.exports = router;