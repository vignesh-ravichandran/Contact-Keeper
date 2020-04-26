const express=require('express');
const router =express.Router();

//@route - post /api/users
//@desc  - register a new user
//@access- public 

router.post('/',(req,res)=>{
    res.send('register a user');
});

module.exports=router;

