// create interface for the submission model
import { Field, Section, ChoiceField} from "../../forms/types/form.types";
interface Submission {
    formId: string;
    data: SubmissionData;
    date: Date;
}

interface SubmissionData {
    fields: SubmissionField[],
    rtfText: string
}

interface SubmissionField {
    label: string;
    value: string;
    keyword: string;
}

export type { Submission, SubmissionData, SubmissionField }
