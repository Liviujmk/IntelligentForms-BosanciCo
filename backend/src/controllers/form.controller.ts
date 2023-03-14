//create form controller based on form model
//

import { Request, Response } from "express";
import FormModel from "../models/form";
import { Form } from "../types/form.types";
import { allowedOrigins } from "../config/corsOptions";



export const formController = {
    //create form
    createForm: async (req: Request, res: Response) => {
        try {
            const {
                userId,
                title,
                fields,
                sections,
                dataRetention,
            } = req.body;
            
            if (!title || !fields || !sections || !dataRetention) return res.status(400).json({ message: "Missing data" });

            //remove spaces and slashes and ? and # and dots from title and make it lowercase
            const titleWithoutSpaces = title.replace(/ /g, '').replace(/[/]/g, '').replace(/[?]/g, '').replace(/[#]/g, '').replace(/[.]/g, '').toLowerCase();

            console.log('titleWithoutSpaces', titleWithoutSpaces) 
            const newForm = await new FormModel({
                userId,
                title: titleWithoutSpaces,
                fields,
                sections,
                dataRetention,
                fillFormUrl: `${allowedOrigins[2]}/fill/${title}`,
            }).save();
            res.status(200).json(newForm);
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    },
    //get all forms
    getForms: async (req: Request, res: Response) => {
        try {
            const forms = await FormModel.find().exec();
            res.status(200).json(forms);
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    },
    //get form by id
    getFormById: async (req: Request, res: Response) => {
        try {
            const form = await FormModel.findById(req.params.id).exec();
            res.status(200).json(form);
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    },
    //update form
    updateForm: async (req: Request, res: Response) => {
        try {
            const {
                title,
                fields,
                sections,
                dataRetention,
            } = req.body;
            if (!title || !fields || !sections || !dataRetention) return res.status(400).json({ message: "Missing data" });

            await FormModel.findByIdAndUpdate({ _id: req.params.id }, {
                title,
                fields,
                sections,
                dataRetention,
            });

            res.status(200).json({ msg: "Updated a form" });
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    },
    //delete form
    deleteForm: async (req: Request, res: Response) => {
        try {
            await FormModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ msg: "Deleted a form" });
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}
