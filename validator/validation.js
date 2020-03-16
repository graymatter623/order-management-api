const {body,validationResult} = require('express-validator');

const loginValidationRules = ()=>{
    return [
        body('employee_username')
            .isLength({min : 5})
            .withMessage("Must of length atleast 5"),
        body('employee_password')
            .isLength({min : 8})
            .withMessage("Must of length atleast 5")
    ];
};
const registerValidationRules = ()=>{
    return[
        body('employee_name')
            .isLength({min : 3})
            .withMessage('Must be of length atleast 3'),
         body('employee_username')
            .isLength({min : 5})
            .withMessage('Must be of length atleast 5'),
        body('employee_password')
            .isLength({min : 8})
            .withMessage('Must be of length atleast 8')
    ];
};
const logsValidationRules = ()=>{
    return [
        body('from')
            .isLength({min : 1}),
        body('to')
            .isLength({min : 1}),
        body('createdAt')
            .isLength({min :8 ,max : 24}),
    ];
}
const filterLogValidationRules = ()=>{
    return [
        body('pageNumber')
            .isNumeric(),
        body('filterLogType')
            .isLength({min : 3})
            .isString(),
        body('filterType')
            .isLength({min : 7})
            .isString(),
        body('filterValue')
            .isLength({min :0,max: 10})
            .isString(),
    ];
}
const loginLogsValidationRules = ()=>{
    return [
        body('username')
            .isLength({min : 5})
            .isString(),
        body('name')
            .isLength({min : 3})
            .isString(),
        body('date')
            .isLength({max : 24})
            .isString()  
    ];
}
const validate = (req,res,next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    const extractedErrors = [];
    errors.array().map(error => extractedErrors.push( { [error.param]: error.msg }));
    return res.status(422).json({
        errors : extractedErrors
    });
}
module.exports = {
    validate,
    registerValidationRules,
    loginValidationRules,
    logsValidationRules,
    filterLogValidationRules,
    loginLogsValidationRules
}