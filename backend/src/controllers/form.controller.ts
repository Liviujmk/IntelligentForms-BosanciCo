//create form controller based on form model
//

import { Request, Response } from "express";
import Form from "../models/form";
import { IntForm } from "../types/form.types";



export const formController = {
    //create form
    createForm: async (req: Request, res: Response) => {
        try {
            const {
                title,
                fields,
                sections,
                dataRetention,
            } = req.body;
            
            if (!title || !fields || !sections || !dataRetention) return res.status(400).json({ message: "Missing data" });

            const newForm = await new Form({
                title,
                fields,
                sections,
                dataRetention,
            }).save();

            res.status(200).json(newForm);
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    },
    //get all forms
    getForms: async (req: Request, res: Response) => {
        try {
            const forms = await Form.find().exec();
            res.status(200).json(forms);
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    },
    //get form by id
    getFormById: async (req: Request, res: Response) => {
        try {
            const form = await Form.findById(req.params.id).exec();
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

            await Form.findByIdAndUpdate({ _id: req.params.id }, {
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
            await Form.findByIdAndDelete(req.params.id);
            res.status(200).json({ msg: "Deleted a form" });
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}
