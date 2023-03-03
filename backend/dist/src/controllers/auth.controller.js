"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.isAuthenticated = void 0;
const user_1 = __importDefault(require("../models/user"));
const crypto_1 = __importDefault(require("crypto"));
const isAuthenticated = (req, res, next) => {
    if (req.cookies.access_token) {
        next();
    }
    else {
        //res.status(401).json({ message: "Unauthorized" });
        next();
    }
};
exports.isAuthenticated = isAuthenticated;
const authController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password: passwordBody, address, userType, subscriptionPlan, fiscalCode } = req.body;
            if (!name || !email || !passwordBody)
                return res.status(400).json({ message: "Missing data" });
            const isUserExists = yield user_1.default.findOne({ email }).exec();
            if (isUserExists)
                return res.status(401).json({ message: "User Already Exists" });
            //const password = await bcrypt.hash(passwordBody, bcryptConfig.salt);
            const password = crypto_1.default.createHash('sha256').update(passwordBody).digest('hex');
            const access_token = crypto_1.default.randomBytes(30).toString("hex");
            const newUser = yield new user_1.default({
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
        }
        catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                return res.status(400).json({ message: "Missing Data" });
            const user = yield user_1.default.findOne({ email }).exec();
            if (!user)
                return res.status(401).json({ message: "Email or Password is Wrong1!" });
            //const isPasswordValid = await bcrypt.compare(password, user.password);
            const hashPassword = (password) => {
                return crypto_1.default.createHash('sha256').update(password).digest('hex');
            };
            const isPasswordValid = hashPassword(password) === user.password;
            if (!isPasswordValid)
                return res.status(401).json({ message: "Email or Password is Wrong2!" });
            //set 1 day cookie
            res.cookie('access_token', user.access_token, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            });
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                access_token: user.access_token,
            });
        }
        catch (err) {
            return res.status(500).json({ message: "Internal Server Error. Please wait until error is solved." });
        }
    }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.clearCookie('access_token');
            return res.status(200).json({ message: "Logout Success" });
        }
        catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }),
};
exports.authController = authController;
