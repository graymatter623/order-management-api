const express = require('express');
const router = express.Router()

router.get('/',(req,res)=>{
    req.session.destroy(()=>{
        console.log("Logged out");
        return res.json({ status: "Logged out" , success : true});
    });
});
module.exports = router;