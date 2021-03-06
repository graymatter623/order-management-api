const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const favicon = require("express-favicon");
const path = require("path");

//Routes
const register = require("./routes/register.js");
const login = require("./routes/login.js");
const createOrder = require("./routes/createOrder.js");
const assignOrderToEmployee = require("./routes/assignOrderToEmployee.js");
const filterOrders = require("./routes/filterOrder.js");
const employees = require("./routes/employees.js");
const searchEmployeeDetails = require("./routes/searchEmployeeDetails.js");
const getTodayOrders = require("./routes/getTodayOrders.js");
const getAllOrders = require("./routes/getOrders");
const editEmployee = require("./routes/editEmployee.js");
const deleteEmployee = require("./routes/deleteEmployee.js");
const logviewer = require("./routes/logviewer.js");
const logs = require("./routes/logs.js");
const loginLogs = require("./routes/loginLogs.js");
const pageNotFound = require("./routes/pageNotFound");
//Mongo DB configuration
const SERVER_MONGODB_URI =
  "mongodb+srv://graymatter623:Shubhamc23$$@cluster0-178l4.mongodb.net/order-management?retryWrites=true&w=majority";
const LOCAL_MONGODB_URI = "mongodb://localhost:27017/order-management";
const PORT = process.env.PORT;
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(LOCAL_MONGODB_URI)
  .then(() => console.log("Connected to server db"))
  .catch(error => mongoose.connect(LOCAL_MONGODB_URI).then("Connected to local db"));

//MiddleWares
app.use(cors());
app.use(express.json());
// app.use(favicon(__dirname + "/build/favicon.ico"));
// app.use(express.static(path.join(__dirname, "build")));
// app.use(express.static(path.join(__dirname,"build","index.html")));

app.use("/register", register);
app.use("/authenticate-login", login);
app.use("/create-order", createOrder);
app.use("/assign-order-to-employee", assignOrderToEmployee);
app.use("/filter-order", filterOrders);
app.use("/employees", employees);
app.use("/search-employee-details", searchEmployeeDetails);
app.use("/get-today-orders", getTodayOrders);
app.use("/get-orders", getAllOrders);
app.use("/edit-employee", editEmployee);
app.use("/delete-employee", deleteEmployee);
app.use("/log-route", logviewer);
app.use("/get-logs", logs);
app.use("/login-logs-route", loginLogs);
// app.use("*",pageNotFound);
// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
// console.log(PORT);
// console.log("ddd");
const server = app.listen(PORT || 5000, () => {
  console.log(`Listening to PORT  ${server.address().port}`);
});
