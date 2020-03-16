const express = require("express");
const EmployeeSchema = require("../models/employee");
const OrderSchema = require("../models/order");
const router = express.Router();
const checkToken = require("../token-authorization/checkToken");
router.get("/:orderId/:employeeId", checkToken.checkToken, (req, res) => {
  OrderSchema.findOne({ _id: orderId }).then(order => {
    EmployeeSchema.findOneAndUpdate(
      {
        _id: req.params.employeeId
      },
      {
        isAvailable: false,
        current_order_id: req.params.orderId
      }
    ).then(employee => {
      if (!employee) {
        res.status(500).json({ error: error, success: false });
      } else {
        console.log("employee Assigned");
        res.status(200).json({ employee: employee, success: true });
      }
    });
  });
});
module.exports = router;
