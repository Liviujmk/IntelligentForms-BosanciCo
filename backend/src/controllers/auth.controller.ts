import { Request, Response } from 'express';
import User from '../models/user';
import crypto from 'crypto';
//import * as bcrypt from 'bcrypt'
import bcryptConfig from '../config/bcrypt';
import { any } from 'zod';

const authController = {
    create: async (req: Request, res: Response) => {
        try {
            const { name, email, password: passwordBody, address, userType, subscriptionPlan, fiscalCode } = req.body;

            if (!name || !email || !passwordBody) return res.status(400).json({ message: "Missing data" });

            const isUserExists = await User.findOne({ email }).exec();

            if (isUserExists) return res.status(401).json({ message: "User Already Exists" })

            //const password = await bcrypt.hash(passwordBody, bcryptConfig.salt);
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

    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) return res.status(400).json({ message: "Missing Data" });

            const user = await User.findOne({ email }).exec();
            if (!user) return res.status(401).json({ message: "Email or Password is Wrong1!" })
            //const isPasswordValid = await bcrypt.compare(password, user.password);

            const hashPassword = (password:any) => {
                return crypto.createHash('sha256').update(password).digest('hex')
            }
            const isPasswordValid = hashPassword(password) === user.password
            if (!isPasswordValid) return res.status(401).json({ message: "Email or Password is Wrong2!" })

            //set 1 day cookie
            res.cookie('access_token', user.access_token, {
                maxAge: 1000 * 60 * 60 * 24,
                secure: true,
                sameSite: 'none'
            });

            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                access_token: user.access_token,
            });

        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error. Please wait until error is solved." })
        }
    },

    logout: async (req: Request, res: Response) => {
        try {
            res.clearCookie('access_token');
            return res.status(200).json({ message: "Logout Success" });
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },
};

const isAuthenticated = async (req: Request, res: Response, next: any) => {
    if (req.cookies.access_token) {
        const { access_token } = req.cookies;
        //find user by access token
        const foundUser = await User.findOne({ access_token }).exec();
        if (foundUser) {
            next();
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }

}

export { isAuthenticated, authController };