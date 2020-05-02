const express=require('express');
const router =express.Router();
const { check, validationResult } = require('express-validator');
const auth   =require('../middleware/auth');
const Contact   =require('../models/Contact');
//@route - get /api/contacts
//@desc  - get a users all contacts
//@access- private 

router.get('/',auth, async (req,res)=>{
    try {
        let contacts = await Contact.find({user:req.user.id}).sort({date:-1});
        
        res.json(contacts);


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route - post /api/contacts
//@desc  - add a new contact to user
//@access- private 

router.post('/',[auth,[
    check('name','Name is Required').not().isEmpty()
]],async (req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
     const {name, email, phone, type}=req.body;

     

    
    try {
        const newContact=new Contact({
            name,
            email,
            phone,
            type,
            user:req.user.id
        });

     const contact=await newContact.save();
       res.json(contact);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

//@route - put /api/contacts/:id
//@desc  - update a contact
//@access- private 

router.put('/:id',auth,async (req,res)=>{
    
    const {name, email, phone, type}=req.body;

    //Build contact object
    const contactFileds={};
    if(name) contactFileds.name=name;
    if(email) contactFileds.email=email;
    if(phone) contactFileds.phone=phone;
    if(type) contactFileds.type=type;

    try {
        
         let contact=await Contact.findById(req.params.id);

         if(!contact) return res.status(404).json({msg:'Contact not found'});

         //make sure user owns contact
         if(contact.user.toString() !== req.user.id){
             return res.status(401).json({msg: 'Not authorised'});
         }

         contact= await Contact.findByIdAndUpdate(req.params.id,{$set: contactFileds},
            {new:true});

            res.json(contact);


    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

});

//@route - delete /api/contacts/:id
//@desc  - delete a contact
//@access- private 

router.delete('/:id',auth, async (req,res)=>{
    try {
        
        let contact=await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({msg:'Contact not found'});

        //make sure user owns contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorised'});
        }

        await Contact.findByIdAndRemove(req.params.id);


           res.json({msg:'Contact removed'});


   } catch (err) {
       console.error(err.message);
       res.status(500).send('server error');
   }

});





module.exports=router;

