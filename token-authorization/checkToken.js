const jwt = require('jsonwebtoken');
const config = require('./config');
const checkToken = (req,res,next)=>{
    if(typeof req.headers.authorization !== "undefined" ){
        token = req.headers.authorization.split(' ')[1];
        if(token){
            jwt.verify(token,config.secret , {algorithm : 'HS256' },(error,user)=>{
                if(error){
                    res.json({
                        success:false ,
                        status : 'cannot verify token'
                    });
                }else{
                    req.user = user;
                    next();
                }

            });
        }
    }else{
        return res.json({
            success : false,
            status : 'Invalid Token',
            token
        });
    }   
};
module.exports.checkToken = checkToken;