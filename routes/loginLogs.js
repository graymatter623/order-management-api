const Logs = require('../models/loginLogs');
const { validate , loginLogsValidationRules} = require('./validator/validation');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
//const checkToken = require('./token-authorization/checkToken');
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
        log.save((error , response)=>{
            if(error){
                console.error('ERROR OCCURED WHILE SAVING THE DOCUMENT');
                res.status(422).json({
                    success  : false,
                    error
                });
            }else { 
                res.status(200).json({
                    success : true,
                });
            }
        });
});
module.exports = router;