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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formRecognizerController = void 0;
const ai_form_recognizer_1 = require("@azure/ai-form-recognizer");
const storage_blob_1 = require("@azure/storage-blob");
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || "atc-storage";
let uploadURL = process.env.AZURE_BLOB_SAS_URL || "<sas url>";
const blobServiceClient = new storage_blob_1.BlobServiceClient(uploadURL);
const containerClient = blobServiceClient.getContainerClient(containerName);
//@ts-ignore
//const blobService = azurestorage.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING);
const azureFunctions = {
    createBlobInContainer: (file) => __awaiter(void 0, void 0, void 0, function* () {
        // create blobClient for container
        console.log('file name: ', file.name);
        const blobClient = containerClient.getBlockBlobClient(file.name);
        // set mimetype as determined from browser with file upload control
        const options = { blobHTTPHeaders: { blobContentType: file.type } };
        // upload file
        yield blobClient.uploadData(file, options);
    }),
    uploadFile: (file) => __awaiter(void 0, void 0, void 0, function* () {
        if (!file)
            return;
        yield azureFunctions.createBlobInContainer(file);
    }),
    getBlobsInContainer: () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        const returnedBlobUrls = [];
        try {
            // get list of blobs in container
            // eslint-disable-next-line
            for (var _d = true, _e = __asyncValues(containerClient.listBlobsFlat()), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                _c = _f.value;
                _d = false;
                try {
                    const blob = _c;
                    console.log(`${blob.name}`);
                    const blobItem = {
                        url: `https://${process.env.AZURE_STORAGE_RESOURCE_NAME}.blob.core.windows.net/${containerName}/${blob.name}?${process.env.AZURE_STORAGE_SAS_TOKEN}`,
                        name: blob.name
                    };
                    // if image is public, just construct URL
                    returnedBlobUrls.push(blob.name);
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return returnedBlobUrls;
    }),
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
        const blobs = yield azureFunctions.getBlobsInContainer();
        console.log('file >>>', file);
        const fields = yield azureFunctions.recognizeForm(file.data, modelId);
        try {
            console.log('fields >>>', fields);
            res.status(200).json(fields);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error 500-2" });
        }
    })
};
