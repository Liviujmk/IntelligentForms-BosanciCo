// create interface for the submission model
import { Field, Section, MultipleChoiceField, SingleChoiceField } from "../../forms/types/form.types";
interface Submission {
    formId: string;
    data: SubmissionData;
    date: Date;
}

interface SubmissionData {
    fields: Field[];
    sections: Section[];
    multipleChoiceFields?: MultipleChoiceField[];
    singleChoiceFields?: SingleChoiceField[];
}

export type { Submission, SubmissionData }
