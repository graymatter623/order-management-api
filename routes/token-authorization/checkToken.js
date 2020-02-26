const jwt = require('jsonwebtoken');
// const fs = require('fs');
const config = require('./config');
const checkToken = (req,res,next)=>{
    //let token;
    console.log(req.headers);
    if(typeof req.headers.authorization !== "undefined" ){
       // console.log('Checking token');
        token = req.headers.authorization.split(' ')[1];
       // let privateKey = fs.readFileSync(__dirname+'/private.pem','utf8');
    //    console.log(token);
        if(token){
           // console.log(token);
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