const exprsss = require('express');
const homeSchema = require('../models/homeSchema');
const Router = exprsss.Router();
const userSchema = require('../models/homeSchema');

Router.get('/',(err,res)=>{
    res .render( 'register', {title:'FILL FORM',password:"",email:""})
});

Router.post('/register',async(req,res)=>{
try {
    const {
        name,
        number,
        email,
        password,
        cpassword
    } =req.body;
   if(password===cpassword){

    const userData = new homeSchema({
        name,
        number,
        email,
        password
    })
    userData.save(err=>{
        if(err){
            
            console.log('err')
        }
        else{
    res .render( 'register', {title:'Done',password:"",email:""})

        }
    })

    const useremail = await homeSchema.findOne({email:email});
    if(email === useremail.email){
    res .render( 'register', {title:'',password:"",email:"Email is Already Present Please chose different one"})
        
    }
    else{
        console.log('error')
    }
   }else{
    res .render( 'register', {title:'Error in code',password:"Password not matching",email:""})
   }
} catch (error) {
    res .render( 'register', {title:'Error in code',password:"",email:""})

}
})

//singn in
Router.post('/login',(req,res)=>{
    const
    {
        email,
        password
    }= req.body;
    homeSchema.findOne({email:email},(err,result)=>{
        if(email === result.email  && password === result.password){
            res.render('deshboard', {name:result.name});
        }
        else{
            console.log(err)
        }
    })
})

module.exports= Router;