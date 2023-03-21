"use strict";
// create azure form recognizer api
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formRecognizerController = void 0;
const ai_form_recognizer_1 = require("@azure/ai-form-recognizer");
const azureFunctions = {
    recognizeForm: (file, modelId) => __awaiter(void 0, void 0, void 0, function* () {
        const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT || "<endpoint>";
        const credential = new ai_form_recognizer_1.AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY || "<api key>");
        const client = new ai_form_recognizer_1.DocumentAnalysisClient(endpoint, credential);
        const poller = yield client.beginAnalyzeDocument(modelId, file);
        const { 
        //@ts-ignore
        documents: [document], } = yield poller.pollUntilDone();
        if (!document) {
            throw new Error("Expected at least one document in the result.");
        }
        return document.fields;
    })
};
exports.formRecognizerController = {
    analyzeIdentityCard: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('req.files >>>', req.files);
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const modelId = process.env.FORM_RECOGNIZER_CUSTOM_MODEL_ID || "<custom model ID>";
        const file = req.files.file;
        console.log('file >>>', file);
        const fields = yield azureFunctions.recognizeForm(file.data, modelId);
        try {
            console.log('fields >>>', fields);
            res.status(200).json(fields);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error 500" });
        }
    }),
    analyzePassport: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('req.files >>>', req.files);
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const file = req.files.file;
        console.log('file >>>', file);
        const fields = yield azureFunctions.recognizeForm(file.data, "prebuilt-idDocument");
        try {
            console.log('fields >>>', fields);
            res.status(200).json(fields);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error 500" });
        }
    }),
    analyzeCarIdentification: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('req.files >>>', req.files);
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const file = req.files.file;
        console.log('file >>>', file);
        const modelId = process.env.FORM_RECOGNIZER_CUSTOM_MODEL_ID_CAR_FILE || "<custom model ID>";
        const fields = yield azureFunctions.recognizeForm(file.data, modelId);
        try {
            console.log('fields >>>', fields);
            res.status(200).json(fields);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error 500" });
        }
    }),
    analyzeBirthCertificate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('req.files >>>', req.files);
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const file = req.files.file;
        console.log('file >>>', file);
        const modelId = process.env.FORM_RECOGNIZER_CUSTOM_MODEL_ID_BIRTH_CERTIFICATE || "<custom model ID>";
        const fields = yield azureFunctions.recognizeForm(file.data, modelId);
        try {
            console.log('fields >>>', fields);
            res.status(200).json(fields);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error 500" });
        }
    })
};
