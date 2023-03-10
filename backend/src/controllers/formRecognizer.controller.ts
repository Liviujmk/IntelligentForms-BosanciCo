// create azure form recognizer api

import { Request, Response } from 'express';
import { AzureKeyCredential, DocumentAnalysisClient } from '@azure/ai-form-recognizer';
import fs from 'fs';
import fileUpload, { UploadedFile } from 'express-fileupload';

export const recognizeForm = async (file:any, modelId:string) => {
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT || "<endpoint>";
  const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY || "<api key>");
  const client = new DocumentAnalysisClient(endpoint, credential);

  let fileStream = fs.createReadStream(file);

  //@ts-ignore
  const poller = await client.beginAnalyzeDocument(
    modelId,
    fileStream
  );
  const {
    //@ts-ignore
    documents: [document],
  } = await poller.pollUntilDone();

  if (!document) {
    throw new Error("Expected at least one document in the result.");
  }

  fs.unlinkSync(file);
  return document.fields;
}

export const formRecognizerController = {
  analyzeIdentityCard: async (req: Request, res: Response) => {
    console.log('req.files >>>', req.files)
    if(!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({message: 'No file uploaded'});
    }

    const modelId = process.env.FORM_RECOGNIZER_CUSTOM_MODEL_ID || "<custom model ID>";
    
    const file: any = req.files.file
    let uploadPath = __dirname + "\\uploads\\" + 'recognizer' + new Date().getTime() + '.jpg';
    file.mv(uploadPath, async (err:any) => {
      if (err) {
        return res.status(500).json({message: 'Internal Server Error'});
      }
      try {
        const result = await recognizeForm(uploadPath, modelId);
        return res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({message: 'Internal Server Error'});
      }
    })
  }
}