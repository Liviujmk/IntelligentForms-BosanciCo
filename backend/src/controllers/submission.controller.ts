import { Request, Response } from 'express';
import Submission from '../models/submission';

// wrrite CRUD operations for submission
export const submissionController = {

    // create submission
    create: async (req: Request, res: Response) => {
        try{
            const { formId, data, date } = req.body;
            const newSubmission = await new Submission({
                formId,
                data,
                date
            }).save();
            return res.status(201).json(newSubmission);
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // get all submissions
    getAll: async (req: Request, res: Response) => {
        try{
            const submissions = await Submission.find().exec();
            return res.status(200).json(submissions);
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // get submission by id
    getById: async (req: Request, res: Response) => {
        try{
            const submission = await Submission.findById(req.params.id).exec();
            return res.status(200).json(submission);
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // update submission by id
    updateById: async (req: Request, res: Response) => {
        try{
            const submission = await Submission.findById(req.params.id).exec();
            if (submission) {
                submission.formId = req.body.formId;
                submission.data = req.body.data;
                submission.date = req.body.date;
                await submission.save();
                return res.status(200).json(submission);
            } else {
                return res.status(404).json({ message: "Submission not found" });
            }
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // delete submission by id
    deleteById: async (req: Request, res: Response) => {
        try{
            const submission = await Submission.findById(req.params.id).exec();
            if (submission) {
                await submission.remove();
                return res.status(200).json({ message: "Submission deleted" });
            } else {
                return res.status(404).json({ message: "Submission not found" });
            }
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

