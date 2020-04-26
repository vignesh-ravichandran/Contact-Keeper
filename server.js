const express=require('express');

const app=express();

app.get('/',(req,res)=> res.json({msg:'Welcome to contact keeper api.. '}));

//define routes
app.use('/api/users', require('./routes/user'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

const PORT=process.env.PORT || 5000;


app.listen(PORT,()=>console.log(`server started at port ${PORT}`));