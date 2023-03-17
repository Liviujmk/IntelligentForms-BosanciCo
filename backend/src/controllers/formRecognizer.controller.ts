// create azure form recognizer api

import { Request, Response } from 'express';
import { AzureKeyCredential, DocumentAnalysisClient } from '@azure/ai-form-recognizer';

const azureFunctions = {
  recognizeForm: async (file:File, modelId:string) => {
    const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT || "<endpoint>";
    const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY || "<api key>");
    const client = new DocumentAnalysisClient(endpoint, credential);
  
    const poller = await client.beginAnalyzeDocument(
      modelId,
      file
    );
    const {
      //@ts-ignore
      documents: [document],
    } = await poller.pollUntilDone();
  
    if (!document) {
      throw new Error("Expected at least one document in the result.");
    }

    return document.fields;
  }
}

export const formRecognizerController = {
  analyzeIdentityCard: async (req: Request, res: Response) => {
    console.log('req.files >>>', req.files)
    if(!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({message: 'No file uploaded'});
    }

    const modelId = process.env.FORM_RECOGNIZER_CUSTOM_MODEL_ID || "<custom model ID>";
    const file: any = req.files.file
    console.log('file >>>', file)

    const fields = await azureFunctions.recognizeForm(file.data, modelId);
    try {
      console.log('fields >>>', fields)
      res.status(200).json(fields);
    } catch (error) {
      res.status(500).json({error: "Internal server error 500" });
    }
  },
  analyzePassport: async (req: Request, res: Response) => {
    console.log('req.files >>>', req.files)
    if(!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({message: 'No file uploaded'});
    }

    const file: any = req.files.file
    console.log('file >>>', file)

    const fields = await azureFunctions.recognizeForm(file.data, "prebuilt-idDocument");
    try {
      console.log('fields >>>', fields)
      res.status(200).json(fields);
    } catch (error) {
      res.status(500).json({error: "Internal server error 500" });
    }
  }

}