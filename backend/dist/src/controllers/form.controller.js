"use strict";
//create form controller based on form model
//
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
exports.formController = void 0;
const form_1 = __importDefault(require("../models/form"));
const submission_1 = __importDefault(require("../models/submission"));
exports.formController = {
    //create form
    createForm: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, title, fields, sections, dataRetention, } = req.body;
            if (!title || !fields || !sections || !dataRetention)
                return res.status(400).json({ message: "Missing data" });
            //remove any caracter that is not a letter or a number
            const titleWithoutSpaces = title.replace(/[^a-zA-Z0-9]/g, '');
            console.log('titleWithoutSpaces', titleWithoutSpaces);
            const newForm = yield new form_1.default({
                userId,
                title: titleWithoutSpaces,
                fields,
                sections,
                dataRetention
            }).save();
            res.status(200).json(newForm);
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }),
    //get all forms
    getForms: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const forms = yield form_1.default.find().exec();
            res.status(200).json(forms);
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }),
    //get all forms by user id
    getFormsByUserId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // @ts-ignore
            const forms = yield form_1.default.find({ userId: req.userId }).exec();
            res.status(200).json(forms);
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }),
    //get form by id
    getFormById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const form = yield form_1.default.findById(req.params.id).exec();
            res.status(200).json(form);
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }),
    //update form
    updateForm: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, fields, sections, dataRetention, } = req.body;
            if (!title || !fields || !sections || !dataRetention)
                return res.status(400).json({ message: "Missing data" });
            yield form_1.default.findByIdAndUpdate({ _id: req.params.id }, {
                title,
                fields,
                sections,
                dataRetention,
            });
            res.status(200).json({ msg: "Updated a form" });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }),
    //delete form
    deleteForm: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //delete all submissions related to this form
            yield submission_1.default.deleteMany({ formId: req.params.id });
            yield form_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json({ msg: "Deleted form with its submissions" });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    })
};
