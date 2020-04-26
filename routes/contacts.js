const express=require('express');
const router =express.Router();

//@route - get /api/contacts
//@desc  - get a users all contacts
//@access- private 

router.get('/',(req,res)=>{
    res.send('get all contacts');
});

//@route - post /api/contacts
//@desc  - add a new contact to user
//@access- private 

router.post('/',(req,res)=>{
    res.send('add a new user');
});

//@route - put /api/contacts/:id
//@desc  - update a contact
//@access- private 

router.put('/:id',(req,res)=>{
    res.send('update a contact');
});

//@route - delete /api/contacts/:id
//@desc  - delete a contact
//@access- private 

router.delete('/:id',(req,res)=>{
    res.send('delete a contact');
});





module.exports=router;

