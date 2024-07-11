import bcrypt from 'bcryptjs';
import {Request, Response} from 'express';

const User = require("../models/user.model");

const registerController = (req: Request, res: Response) => {
    res.status(200).json({message: 'Register controller works'});
    // try{
    //     const {userEmail, password} = req.body;

    //     if (!userEmail || !password){
    //         return res.status(400).json({message: 'Please enter all fields'});
    //     }

    //     const userExists = User.findOne({eamil: userEmail});

    //     if (userExists){
    //         return res.status(400).json({message: 'User already exists'});
    //     }

    //     const salt = bcrypt.genSaltSync(10);

    //     const hashedPassword = bcrypt.hashSync(password, salt);

    //     const user = new User({
    //         email: userEmail,
    //         password: hashedPassword,
    //     });

    //     user.save();

    //     res.status(201).json({success: true, message: 'User created successfully'});
        
    // }
    // catch(e){
    //     console.log(e);
    //     res.status(500).json({message: 'Internal Server Error'});
    // }
};

export {registerController};