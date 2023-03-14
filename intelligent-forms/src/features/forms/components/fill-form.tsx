import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { getForm } from "../api/api.forms";
import { Form, Field, MultipleChoiceField, SingleChoiceField, Section } from "../types/form.types";
import Submission from "../../submissioons/types/submission.types";
import { Controller, useForm } from 'react-hook-form'

export const FillForm = () => {
    //fetch form from (url) api and set it to form state
    const { formId } = useParams();
    const [form, setForm] = useState<Form | null>(null);
    async function fetchForm() {
        const form = await getForm(formId as string);
        setForm(form);
    }
    useEffect(() => {
        fetchForm();
    }, []);

    //create submission form object
    const [filledForm, setFilledForm] = useState<Submission | null>({
        formId: formId as string,
        data: {},
        date: new Date(),
    });


    const [sections, setSections] = useState<Section[]>([]);
    const [fields, setFields] = useState<Field[]>([]);
    const [multipleChoiceFields, setMultipleChoiceFields] = useState<MultipleChoiceField[]>([]);
    const [singleChoiceFields, setSingleChoiceFields] = useState<SingleChoiceField[]>([]);

    console.log(form);
    return (
        <div>
            <h1>Fill form - <u>{form?.title}</u></h1>
            <div>
                {
                    form?.fields.map((field) => {
                        return (
                            <div>
                                <label>{field.label}</label>
                                <input type="text" placeholder={field.placeholder} />
                            </div>
                        )
                    })
                }
                {
                    form?.sections.map((section: Section) => {
                        return (
                            <div>
                                <br />
                                <textarea name="" id="" value={section.rtfText}></textarea>
                                <br />
                                <input type="file" />
                                <br />
                                <br />
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}