const Logs = require('../models/logs');
const {validate,logsValidationRules} = require('../validator/validation');
const express =require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.post(
    '/',
    logsValidationRules(),
    validate,
    bodyParser.urlencoded({extended : false}),
(req,res)=>{
    const log = new Logs({
        from : req.body.from,
        to :req.body.to,
        createdAt : req.body.createdAt,
    });
    log.save().then((response)=>{
        if(response){
            res.status(200).json({success : true ,message : "Logs created"});
        }
    }).catch(error=>{
        if(error){
            console.log(error);
            res.status(422).json({error : {
                message : "Cannot Create log"
            } , success : false});
        }
    });
});

module.exports = router;