import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { useParams } from "react-router-dom";

import { API_PATH_LOCAL, API_PATH_PROD } from "../../../config/api";

import { getForm } from "../../forms/api/api.forms";
import { capitalizeFirstLetter, capitalizeString,lowercaseString } from "../utils/input.functions";

import { Form, Field, Section, ChoiceField } from "../../forms/types/form.types";
import { Submission, SubmissionData, SubmissionField } from "../../submissioons/types/submission.types";
import { Controller, useForm } from 'react-hook-form'
import { Dropdown } from "primereact/dropdown";
import { TabView, TabPanel } from 'primereact/tabview';
import { BaseLayout } from "../../../layouts/base-layout/base.layout";
import './fill-form.css'
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';

//import fill layouts
import { TabHeaderTemplate } from "../layouts/layouts.fill";

export const FillForm = () => {
    //fetch form from (url) api and set it to form state
    const { formId } = useParams();
    const [form, setForm] = useState<Form | null>(null);
    const [sections, setSections] = useState<Section[]>([]);
    const [fields, setFields] = useState<any[]>([]);
    async function fetchForm() {
        const form = await getForm(formId as string);
        setForm(form);
        setFields(form?.fields);
    }
    useEffect(() => {
        fetchForm();
    }, []);
    console.log('fields = ', fields)

    //set form fields to state
    const [formFields, setFormFields] = useState<SubmissionField[]>([
        {
            label: '',
            value: '',
        }
    ]);
    useEffect(() => {
        setFormFields(fields.map((field: Field) => {
            return {
                label: field.label,
                value: '',
            }
        }));
    }, [fields]);
    console.log('formFields = ', formFields);


    const [filledForm, setFilledForm] = useState<Submission>({
        formId: formId as string,
        data: {
            fields : [],
            rtfText: '',
        },
        date: new Date(),
    });
    useEffect(() => {
        setFilledForm({
            ...filledForm,
            data: {
                ...filledForm?.data,
                fields: formFields,
            }
        });
    }, [formFields]);
    //update filledForm data.fields after fetching form
    /*useEffect(() => {
        setFilledForm({
            ...filledForm,
            data: {
                ...filledForm?.data,
                
            }
        });
    }, [formFields]);*/



    const [recognizedForm, setRecognizedForm] = useState<any>({});

    const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilledForm({
            ...filledForm,
            data: {
                ...filledForm?.data,
                fields: filledForm?.data?.fields.map((field: SubmissionField) => {
                    if (field.label === name) {
                        return {
                            ...field,
                            value: value,
                        }
                    }
                    return field;
                })
            }
        });
    }

    /*const [file, setFile] = useState<File>();
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };*/

    const analyzePhoto = async (e: FileUploadHandlerEvent) => {
        const file = e.files[0];
        console.log('file = ', file);
        if (!file) {
            console.log('No file selected. Please select a file and try again.');
            return
        }
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${API_PATH_PROD}analyze`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        setRecognizedForm(data);
        console.log(data);
        const keys = Object.keys(data);
        // setFilledForm({
        //     ...filledForm,
        //     data: {
        //         ...filledForm?.data,
        //         fields: filledForm?.data?.fields.map((field: SubmissionField) => {
        //             if (field.label === Object.keys(data)) {
        //                 return {
        //                     ...field,
        //                     value: data[lowercaseString(field.label)].value,
        //                 }
        //             }
        //             return field;
        //         })
        //     }
        // });

    }

    const [selectedCity, setSelectedCity] = useState<any>(null);

    // city dropdown
    interface City {
        name: string,
    }
    const cities: City[] = [
        { name: 'New York' },
        { name: 'Rome' },
        { name: 'London' },
        { name: 'Istanbul' },
        { name: 'Paris' }
    ];


    console.log('filledForm = ', filledForm)

    return (
        <div>
            <h1>Fill form - <u>{form?.title}</u></h1>
            <div className="fill-container">
                <TabView>
                    {
                        form?.sections.map((section: Section) => {
                            return (
                                <TabPanel header={`Section ${section.sectionNr}`} headerTemplate={TabHeaderTemplate}>
                                    <Card>
                                        <div>
                                            <FileUpload customUpload uploadHandler={analyzePhoto} className="form-btn" mode="basic" accept="image/*" maxFileSize={1000000} auto chooseLabel={'Scan ' + section.documentType} />
                                        </div>
                                        {
                                            form?.fields.filter((field: ChoiceField) => field.sectionNr === section.sectionNr).map((field: ChoiceField) => {
                                                return (
                                                    <div className="input-container">
                                                        {

                                                            field.fieldType === 'number' && (
                                                                <div>
                                                                    <span className="p-float-label">
                                                                        <InputText id="number-input" keyfilter="int" onChange={handleFieldChange} name={field.label} />
                                                                        <label htmlFor="number-input">{capitalizeFirstLetter(field.label)}</label>
                                                                    </span>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            field.fieldType === 'string' && (
                                                                <div>
                                                                    <span className="p-float-label">
                                                                        <InputText id="username" />
                                                                        <label htmlFor="username">{capitalizeFirstLetter(field.label)}</label>
                                                                    </span>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            field.fieldType === 'single-choice' && (
                                                                <div>
                                                                    <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                                                                        placeholder={capitalizeFirstLetter(field.label)} className="w-full md:w-14rem" />
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </Card>
                                </TabPanel>
                            )
                        })
                    }
                    <TabPanel header={`Preview`} headerTemplate={TabHeaderTemplate}>asd</TabPanel>
                </TabView>
            </div>
        </div>
    )
}