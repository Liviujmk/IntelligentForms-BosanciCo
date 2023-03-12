import { Request, Response } from 'express';
import User from '../models/user';
import crypto from 'crypto';

export const userController={
   // make CRUD operations for user

    // create user
    create: async (req: Request, res: Response) => {

        try {
            const { name, email, password: passwordBody, address, userType, subscriptionPlan, fiscalCode } = req.body;

            if (!name || !email || !passwordBody) return res.status(400).json({ message: "Missing data" });

            const isUserExists = await User.findOne({ email }).exec();

            if (isUserExists) return res.status(401).json({ message: "User Already Exists" })

            const password = crypto.createHash('sha256').update(passwordBody).digest('hex');
            const access_token = crypto.randomBytes(30).toString("hex");

            const newUser = await new User({
                name,
                email,
                password,
                address,
                userType,
                subscriptionPlan,
                fiscalCode,
                access_token
            }).save();

            return res.status(201).json(newUser);

        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // get all users
    getAll: async (req: Request, res: Response) => {
        try {
            const users = await User.find().exec();
            return res.status(200).json(users);
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // get user by id
    getById: async (req: Request, res: Response) => {
        try{
            const user = await User.findById(req.params.id).exec();
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // update user
    update: async (req: Request, res: Response) => {
        try{
            const user = await User.findById(req.params.id).exec();
            if (!user) return res.status(404).json({ message: "User Not Found" });
            const { name, email, password: passwordBody, address, userType, subscriptionPlan, fiscalCode } = req.body;
            if (name) user.name = name;
            if (email) user.email = email;
            if (passwordBody) {
                user.password = crypto.createHash('sha256').update(passwordBody).digest('hex');
            }
            if (address) user.address = address;
            if (userType) user.userType = userType;
            if (subscriptionPlan) user.subscriptionPlan = subscriptionPlan;
            if (fiscalCode) user.fiscalCode = fiscalCode;
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // delete user
    delete: async (req: Request, res: Response) => {
        try{
            const user = await User.findById(req.params.id).exec();
            if (!user) return res.status(404).json({ message: "User Not Found" });
            await user.remove();
            return res.status(200).json({ message: "User Deleted" });

        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

}

