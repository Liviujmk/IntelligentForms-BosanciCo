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
exports.submissionController = void 0;
const submission_1 = __importDefault(require("../models/submission"));
// wrrite CRUD operations for submission
exports.submissionController = {
    // create submission
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { formId, data, date } = req.body;
            const newSubmission = yield new submission_1.default({
                formId,
                data,
                date
            }).save();
            return res.status(201).json(newSubmission);
        }
        catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }),
    // get all submissions
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const submissions = yield submission_1.default.find().exec();
            return res.status(200).json(submissions);
        }
        catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }),
    // get submission by id
    getById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const submission = yield submission_1.default.findById(req.params.id).exec();
            return res.status(200).json(submission);
        }
        catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }),
    // update submission by id
    updateById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const submission = yield submission_1.default.findById(req.params.id).exec();
            if (submission) {
                submission.formId = req.body.formId;
                submission.data = req.body.data;
                submission.date = req.body.date;
                yield submission.save();
                return res.status(200).json(submission);
            }
            else {
                return res.status(404).json({ message: "Submission not found" });
            }
        }
        catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }),
    // delete submission by id
    deleteById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const submission = yield submission_1.default.findById(req.params.id).exec();
            if (submission) {
                yield submission.remove();
                return res.status(200).json({ message: "Submission deleted" });
            }
            else {
                return res.status(404).json({ message: "Submission not found" });
            }
        }
        catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    })
};
