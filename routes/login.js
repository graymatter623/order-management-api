const Employee = require("../models/employeeLoginSchema");
const { validate, loginValidationRules } = require("../validator/validation");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const config = require("../token-authorization/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
router.post(
  "/",
  bodyParser.urlencoded({ extended: false }),
  loginValidationRules(),
  validate,
  (req, res) => {
    console.log("INSIDE LOGIN");
    Employee.findOne({ username: req.body.employee_username }).then(emp => {
      if (emp) {
        if (emp === null || emp === undefined) {
          console.log("error");
        } else {
          bcrypt
            .compare(req.body.employee_password, emp.password)
            .then(result => {
              if (result) {
                let token = jwt.sign(
                  {
                    username: req.body.employee_username
                  },
                  config.secret,
                  {
                    algorithm: "HS256",
                    expiresIn: "24h"
                  }
                );
                if (emp.isOwner) {
                  res.status(200).json({
                    isOwner: true,
                    success: true,
                    successValue : 1,
                    employee: emp,
                    token,
                  });
                } else {
                  res.status(200).json({
                    isOwner: false,
                    success: true,
                    successValue :1,
                    employee: emp,
                    token,
                    
                  });
                }
                console.log("Logged IN");
              }
            });
        }
      } else {
        console.log("wrong id pass");
        res
          .status(200)
          .json({success: false , successValue : 2 });
      }
    });
  }
);
module.exports = router;
