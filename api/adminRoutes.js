const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const{signUpValidation,signInValidation} = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');


//SIGNUP
router.patch('/signup', async (req, res) => {
    const validation = signUpValidation(req.body);
    if(validation.error) return console.log(validation.error.details[0].message);
    
    let{fullName, email, adminId} = req.body;
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    let password = hashedPassword;
    
    //checking admin id
    try{
        let adminExist = await Admin.findOne({adminId: req.body.adminId});
        if(!adminExist){
            res.send('not an admin')
            return console.log(`not an admin`);  
        } 
    }catch(err){
            if(err) return console.log(err);
        };
    
    
    //saving the admin by updating the data with the corresponding admin id
    try{
        const filter = {adminId: adminId}
        const update = {fullName: fullName, email: email, password: password}
        let newAdmin = await Admin.findOneAndUpdate(filter, update);
        res.send(newAdmin);
    }catch(err) {
        res.status(400).send(err)
    }
        
});


//SIGNIN
router.post('/signin', async (req, res) => {
    const validation = signInValidation(req.body);
    if(validation.error) return console.log(validation.error.details[0].message);
    
    //checking admin validity 
    let{email, password} = req.body;
    try{
        let admin = await Admin.findOne({email: email});
             if(!admin){
                res.send('email incorrect')
                return console.log(`email incorrect`);
             }  
             const validatePassword = await bcrypt.compare(password, admin.password) 
              if(!validatePassword){
                res.send('password incorrect')
                return console.log('password incorrect')
              } 
              // creating and inserting token 
              const token = jwt.sign({
                  _id: admin._id,
                  email: admin.email,
                }, process.env.TOKEN_SECRETE
                ,{
                    expiresIn: '1h' 
                }
                
                );
                res.send({"auth_token":token})
        }catch(err){
              if(err) return console.log(err);
          };
    
});

module.exports = router;