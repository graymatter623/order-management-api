const Logs = require('../models/loginLogs');
const { validate , loginLogsValidationRules} = require('../validator/validation');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlEncoded = bodyParser.urlencoded({extended: true});
router.post(
    '/',
    loginLogsValidationRules(),
    validate,
    urlEncoded, 
    (req,res)=>{
        let username = req.body.username;
        let name = req.body.name;
        let date = req.body.date;
        const log = new Logs({
            username : username,
            name : name,
            date : date
        });
        log.save().then((response)=>{
            if(response) { 
                res.status(200).json({
                    success : true,
                });
            }
        }).catch(error=>{
            if(error){
                res.status(500).json({ success : false});
            }
        });
});
module.exports = router;