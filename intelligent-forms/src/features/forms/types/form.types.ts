// create interface for the form model

interface Form {
    _id?: string;
    userId?: string;
    title: string;
    fields: Field[] | ChoiceField[];
    sections: Section[];
    dataRetention: number;
    createdAt?: Date;
    fillFormUrl?: string;
}

// create interface for the field model

interface Field {
    label: string;
    fieldType: string;
    placeholder: string;
    keyword: string;
    mandatory: boolean;
    sectionNr: any;
}
interface ChoiceField extends Field {
    options?: string[];
}

// create interface for the section model

interface Section {
    rtfText: string;
    documentType: string;
    sectionNr: any;
}


export type { Form, Field, Section, ChoiceField };