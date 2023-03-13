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
exports.userController = void 0;
const user_1 = __importDefault(require("../models/user"));
const crypto_1 = __importDefault(require("crypto"));
exports.userController = {
    // make CRUD operations for user
    // create user
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password: passwordBody, address, userType, subscriptionPlan, fiscalCode } = req.body;
            if (!name || !email || !passwordBody)
                return res.status(400).json({ message: "Missing data" });
            const isUserExists = yield user_1.default.findOne({ email }).exec();
            if (isUserExists)
                return res.status(401).json({ message: "User Already Exists" });
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
    // get all users
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield user_1.default.find().exec();
            return res.status(200).json(users);
        }
        catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }),
    // get user by id
    getById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.findById(req.params.id).exec();
            return res.status(200).json(user);
        }
        catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }),
    // update user
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.findById(req.params.id).exec();
            if (!user)
                return res.status(404).json({ message: "User Not Found" });
            const { name, email, password: passwordBody, address, userType, subscriptionPlan, fiscalCode } = req.body;
            if (name)
                user.name = name;
            if (email)
                user.email = email;
            if (passwordBody) {
                user.password = crypto_1.default.createHash('sha256').update(passwordBody).digest('hex');
            }
            if (address)
                user.address = address;
            if (userType)
                user.userType = userType;
            if (subscriptionPlan)
                user.subscriptionPlan = subscriptionPlan;
            if (fiscalCode)
                user.fiscalCode = fiscalCode;
            return res.status(200).json(user);
        }
        catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }),
    // delete user
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.findById(req.params.id).exec();
            if (!user)
                return res.status(404).json({ message: "User Not Found" });
            yield user.remove();
            return res.status(200).json({ message: "User Deleted" });
        }
        catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }),
};
