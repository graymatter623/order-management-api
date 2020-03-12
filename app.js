const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
//Routes
const register = require('./routes/register.js');
const login = require('./routes/login.js');
const createOrder = require('./routes/createOrder.js');
const assignOrderToEmployee = require('./routes/assignOrderToEmployee.js');
const filterOrders = require('./routes/filterOrder.js');
const employees = require('./routes/employees.js');
const searchEmployeeDetails = require('./routes/searchEmployeeDetails.js');
const getTodayOrders =require('./routes/getTodayOrders.js');
const getAllOrders = require('./routes/getOrders');
const editEmployee =require('./routes/editEmployee.js');
const deleteEmployee = require('./routes/deleteEmployee.js');
const logviewer = require('./routes/logviewer.js');
const logs = require('./routes/logs.js');
const loginLogs = require('./routes/loginLogs.js');
//Mongo DB configuration
const MONGODB_URI = "mongodb://localhost:27017/order-management";
const PORT = 5000;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(MONGODB_URI)
    .then( ()=> console.log('Connected to db'))
    .catch((error)=> console.log('Something went wrong',error));
//Middlewares 
app.use(cors());
app.use(express.json());
app.use('/register',register);
app.use('/authenticate-login',login);
app.use('/create-order',createOrder);
app.use('/assign-order-to-employee',assignOrderToEmployee);
app.use('/filter-order',filterOrders);
app.use('/employees',employees);
app.use('/search-employee-details',searchEmployeeDetails);
app.use('/get-today-orders',getTodayOrders);
app.use('/get-orders',getAllOrders);
app.use('/edit-employee',editEmployee);
app.use('/delete-employee',deleteEmployee);
app.use('/log-route',logviewer);
app.use('/get-logs',logs);
app.use('/login-logs-route',loginLogs);
const server = app.listen(PORT || 5000 , ()=>{
    console.log(`Listening to PORT  ${server.address().port}`);
});