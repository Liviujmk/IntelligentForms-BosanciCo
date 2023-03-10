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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formRecognizerController = exports.recognizeForm = void 0;
const ai_form_recognizer_1 = require("@azure/ai-form-recognizer");
const fs_1 = __importDefault(require("fs"));
const recognizeForm = (file, modelId) => __awaiter(void 0, void 0, void 0, function* () {
    const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT || "<endpoint>";
    const credential = new ai_form_recognizer_1.AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY || "<api key>");
    const client = new ai_form_recognizer_1.DocumentAnalysisClient(endpoint, credential);
    let fileStream = fs_1.default.createReadStream(file);
    //@ts-ignore
    const poller = yield client.beginAnalyzeDocument(modelId, fileStream);
    const { 
    //@ts-ignore
    documents: [document], } = yield poller.pollUntilDone();
    if (!document) {
        throw new Error("Expected at least one document in the result.");
    }
    fs_1.default.unlinkSync(file);
    return document.fields;
});
exports.recognizeForm = recognizeForm;
exports.formRecognizerController = {
    analyzeIdentityCard: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('req.files >>>', req.files);
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const modelId = process.env.FORM_RECOGNIZER_CUSTOM_MODEL_ID || "<custom model ID>";
        const file = req.files.file;
        let uploadPath = __dirname + "\\uploads\\" + 'recognizer' + new Date().getTime() + '.jpg';
        file.mv(uploadPath, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            try {
                const result = yield (0, exports.recognizeForm)(uploadPath, modelId);
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }));
    })
};
