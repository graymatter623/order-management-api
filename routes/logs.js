const express = require("express");
const router = express.Router();
const Logs = require("../models/logs");
const LoginLogs = require('../models/loginLogs');
const bodyParser = require("body-parser");
const checkToken = require("./token-authorization/checkToken");
const {
  validate,
  filterLogValidationRules
} = require("./validator/validation.js");
const LIMIT = 10;
router.post(
  "/",
  checkToken.checkToken,
  filterLogValidationRules(),
  validate,
  bodyParser.urlencoded({ extended: true }),
   (req, res)  => {
    const pageNumber = new Number(req.body.pageNumber);
    const filterLogType = req.body.filterLogType;
    const filterType = req.body.filterType;
    const filterValue = req.body.filterValue;
    // console.log(pageNumber , filterLogType );
    if(filterLogType === "LOGIN"){
      if (filterType === "BY_DATE") {
        const isoDate = new Date(filterValue).toISOString();
        LoginLogs.find(
          { date: 
            { 
              $eq: isoDate 
            } 
          } 
        ).skip( (pageNumber-1)*LIMIT).limit(LIMIT*pageNumber)
        .then((logs) => {
          if(logs){
            res.status(200).json({ success: true, logs:logs });
          }
        });
      } else if (filterType === "BY_HOURS") {
        let currHour = new Date().getHours();
        let inputHour = new Number(filterValue);
        let hourDiff = currHour - inputHour;
        let isoDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          hourDiff,
          0,
          0
        );
        LoginLogs.find({ date: 
            { 
              $lte: new Date().toISOString(),
              $gte: isoDate 
            } 
          },
        ).skip( (pageNumber-1) * LIMIT ).limit(LIMIT*pageNumber).then((logs) => {
          if(logs){
            res.status(200).json({ success: true, logs:logs });
          }
        });
      }else if(filterType === "SHOW_ALL"){
        LoginLogs.find().skip( (pageNumber-1) * LIMIT ).limit(LIMIT*pageNumber).then((logs) => {
          if(logs){
            res.status(200).json({ success: true, logs:logs });
          }
        });
      }
    }else if(filterLogType === "ROUTE"){
      if (filterType === "BY_DATE") {
        const isoDate = new Date(filterValue).toISOString();
        Logs.find({ createdAt: { $eq: isoDate } }).skip((pageNumber-1)*LIMIT).limit(LIMIT*pageNumber)
          .then((logs) => {
            if(logs){
              res.status(200).json({ success: true, logs:logs });
            }
          });
      } else if (filterType === "BY_HOURS") {
        let currHour = new Date().getHours();
        let inputHour = new Number(filterValue);
        let hourDiff = currHour - inputHour;
        let isoDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          hourDiff,
          0,
          0
        );
       Logs.find({ date: { 
            $lte: new Date().toISOString(),
            $gte: isoDate 
          } 
        },
        ).skip( (pageNumber-1) * LIMIT ).limit(LIMIT*pageNumber)
          .then((logs) => {
            if(logs){
              res.status(200).json({ success: true, logs:logs });
            }
          });
      }else if(filterType === "SHOW_ALL"){
        Logs.find().skip( (pageNumber-1) * LIMIT ).limit(LIMIT*pageNumber).then((logs) => {
          if(logs){
            res.status(200).json({ success: true, logs:logs });
          }
        });
      }
    }
  }
);
module.exports = router;
