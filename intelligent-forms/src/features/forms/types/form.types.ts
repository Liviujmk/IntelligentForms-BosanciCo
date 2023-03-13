// create interface for the form model

interface Form {
    _id?: string;
    userId?: string;
    title: string;
    fields: Field[];
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

// create interface for the section model

interface Section {
    rtfText: string;
    documentType: string;
    sectionNr: any;
}

interface MultipleChoiceField extends Field {
    options: string[];
}

interface SingleChoiceField extends Field {
    options: string[];
}

export type { Form, Field, Section, MultipleChoiceField, SingleChoiceField };