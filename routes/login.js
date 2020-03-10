const Employee = require("../models/employeeLoginSchema");
const { validate, loginValidationRules } = require("./validator/validation");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const config = require("./token-authorization/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
router.post(
  "/",
  bodyParser.urlencoded({ extended: false }),
  loginValidationRules(),
  validate,
  (req, res) => {
    Employee.findOne(
      {
        username: req.body.employee_username,
      },
      (error, emp) => {
        if (emp) {
          if (emp === null || emp === undefined) {
            console.log("error");
          } else {
            bcrypt.compare(
              req.body.employee_password,
              emp.password
            ).then((result) => {
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
                    res.json({
                      isOwner: true,
                      success: true,
                      employee: emp,
                      token
                    });
                  } else {  
                    res.json({
                      isOwner: false,
                      success: true,
                      employee: emp,
                      token
                    });
                  }
                }
              });
          }
        } else {
          console.log("wrong id pass");
          res.json({ success: false, message: "Invalid ID or passsword" });
        }
      }
    );
  }
);
module.exports = router;
