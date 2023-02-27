// create interface for the form model
//

interface Form {
    title: string;
    fields: Field[];
    sections: Section[];
    dataRetention: number;
}

// create interface for the field model

interface Field {
    label: string;
    fieldType: string;
    placeholder: string;
    keyword: string;
    mandatory: boolean;
}

// create interface for the section model

interface Section {
    rtfText: string;
    documentType: string;
}

interface MultipleChoiceField extends Field {
    options: string[];
}

interface SingleChoiceField extends Field {
    options: string[];
}

export { Form, Field, Section, MultipleChoiceField, SingleChoiceField };