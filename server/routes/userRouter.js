const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

//creating a new user
router.post('/user',(req,res,next) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),   //hashing password
        gender: req.body.gender,
        dob: req.body.dob,
        religion: req.body.religion,
        caste: req.body.caste,
        address: req.body.address,
        state: req.body.state,
        city: req.body.city
    });
    User.find({email: req.body.email})  //check if user already exist
        .then(users => 
            {
                if(users.length==0) //if user does not exist
                {
                    newUser.save()
                        .then(user => 
                            {
                                let token = jwt.sign({ email: user.email }, 'secret', { expiresIn:'1h' });
                                res.json({"msg":"User Created successfully!", token})
                            }) 
                        .catch(err => res.json(err))
                }
                else
                    res.json({"msg":"Email already exist"});    //if user already exists
            })
        .catch(err => res.json(err))
})

//checking for the password to be correct
router.post('/authenticate',(req,res,next) => {
    User.findOne({ email:req.body.email})
        .then(user => 
            {
                if(!user)  //if user doesn't exist
                {
                    res.json({"msg":"User doesn't exist"});
                }
                else    //if user exists
                {
                    if(bcrypt.compareSync(req.body.password, user.password))    //if password matches
                    {
                        let token = jwt.sign({ email: user.email }, 'secret', { expiresIn:'1h' });
                        res.json({"msg":"Password matched", token});
                    }
                    else    //if password doesn't match
                    {
                        res.json({"msg":"Password is incorrect"});  
                    }
                }
            })
        .catch(err => res.json(err))
})

//fetching user data
router.get('/profile', (req,res,next) => {
    jwt.verify(req.query.token, 'secret', (err,data) => {
        if(err)
        {
            return res.json(err);
        }
        else if(data)
        {
            User.findOne({ email:data.email })
                .then(user => res.json(user))
                .catch(err => res.json(err))
        }
    })
})


module.exports = router;