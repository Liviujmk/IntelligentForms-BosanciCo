// create interface for the form model
//

interface Form {
    userId: string;
    title: string;
    fields: Field[]|ChoiceField[];
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
    sectionNr: number;
}
interface ChoiceField extends Field {
    options?: Options[];
}

// create interface for the section model

interface Section {
    rtfText: string;
    documentType: string;
    sectionNr: number;
}

type Options = {
    name: string;
}

export { Form, Field, Section, ChoiceField, Options};