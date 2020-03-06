const express = require("express");
const router = express.Router();
const Logs = require("../models/logs");
const bodyParser = require("body-parser");
const checkToken = require("./token-authorization/checkToken");
const {
  validate,
  filterLogValidationRules
} = require("./validator/validation.js");
router.post(
  "/",
  checkToken.checkToken,
  filterLogValidationRules(),
  validate,
  bodyParser.urlencoded({ extended: true }),
  (req, res) => {
    const filterType = req.body.filterType;
    const filterValue = req.body.filterValue;
    if (filterType === "BY_DATE") {
      const isoDate = new Date(filterValue).toISOString();
      Logs.find({ createdAt: { $eq: isoDate } }, (error, logs) => {
        if (error) {
          res.status(404).json({ success: false });
        } else {
          res.status(200).json({ success: true, logs: logs });
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
      Logs.find(
        { createdAt: { $lte: new Date().toISOString(), $gte: isoDate } },
        (error, logs) => {
          if (error) {
            res.status(404).json({ success: false });
          } else {
            res.json({ success: true, logs: logs });
          }
        }
      );
    }
  }
);
module.exports = router;
