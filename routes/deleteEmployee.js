const express = require("express");
const router = express.Router();
const EmployeeSchema = require("../models/employee");
const bodyParser = require("body-parser");
const checkToken = require("../token-authorization/checkToken");
router.get(
  "/:employeeId",
  checkToken.checkToken,
  bodyParser.urlencoded({ extended: false }),
  (req, res) => {
    
    EmployeeSchema.findOneAndDelete({ _id: req.params.employeeId }, (error, employee) => {
      console.log("EmployeeDeleted");
      if (error) {
        res.status(503).json({ success: false, error: error });
      }
      res.status(200).json({ success: true, employee: employee });
    });
  }
);
module.exports = router;
