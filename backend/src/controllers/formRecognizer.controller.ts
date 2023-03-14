// create azure form recognizer api

import { Request, Response } from 'express';
import { AzureKeyCredential, DocumentAnalysisClient } from '@azure/ai-form-recognizer';
import fs from 'fs';
import fileUpload, { UploadedFile } from 'express-fileupload';
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob"

const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || "atc-storage";
let uploadURL = process.env.AZURE_BLOB_SAS_URL || "<sas url>";
const blobServiceClient = new BlobServiceClient(uploadURL);
const containerClient = blobServiceClient.getContainerClient(containerName);
//@ts-ignore
import intoStream from 'into-stream';


//@ts-ignore
//const blobService = azurestorage.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING);

const azureFunctions = {
  createBlobInContainer:  async (file: File) => {
    // create blobClient for container
    console.log('file name: ', file.name)
    const blobClient = containerClient.getBlockBlobClient(file.name);
    
    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };
  
    // upload file
    await blobClient.uploadData(file, options);
  },
  uploadFile: async (file: File) => {
    if(!file) return
    await azureFunctions.createBlobInContainer(file);
  },
  getBlobsInContainer: async () => {
    const returnedBlobUrls = [];
  
    // get list of blobs in container
    // eslint-disable-next-line
    for await (const blob of containerClient.listBlobsFlat()) {
      console.log(`${blob.name}`);
  
      const blobItem = {
        url: `https://${process.env.AZURE_STORAGE_RESOURCE_NAME}.blob.core.windows.net/${containerName}/${blob.name}?${process.env.AZURE_STORAGE_SAS_TOKEN}`,
        name: blob.name
      }
  
      // if image is public, just construct URL
      returnedBlobUrls.push(blob.name);
    }
  
    return returnedBlobUrls;
  },
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
    const blobs = await azureFunctions.getBlobsInContainer();
    console.log('file >>>', file)

    const fields = await azureFunctions.recognizeForm(file.data, modelId);
    try {
      console.log('fields >>>', fields)
      res.status(200).json(fields);
    } catch (error) {
      res.status(500).json({error: "Internal server error 500-2" });
    }
  }
}