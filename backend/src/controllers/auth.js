const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

exports.signup = (req,res) => {

    User.findOne({ email: req.body.email })
    .exec(async (error, user) => {
        if(user) return res.status(400).json({
            message: 'User exists!'
        });

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            userName: shortid.generate()
        });

        _user.save((error, data) => {
            if(data){
                return res.status(201).json({
                    message: "User created successfully!"
                });
            }
            
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong!'
                });
            }

        });
    });
}

exports.signin = (req,res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(error){
            console.log(error);
             return res.status(400).json({ error });
        }
        if(user){
            
            if(user.authenticate(req.body.password) && user.role ==='user'){
                const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1d'});
                const { _id, firstName, lastName, email, role, fullname } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id, firstName, lastName, email, role, fullname
                    }
                });
                
            }else{
                return res.status(400).json({
                    message: "Something Went Wrong!"
                })
            }

        }else{
            return res.status.json({message: "Something went wrong!"});
        }
    });
}

