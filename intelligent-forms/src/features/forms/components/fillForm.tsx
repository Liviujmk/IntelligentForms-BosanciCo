import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { useParams } from "react-router-dom";

import { API_PATH_LOCAL, API_PATH_PROD } from "../../../config/api";

import { getForm } from "../api/api.forms";
import { Form, Field, MultipleChoiceField, SingleChoiceField, Section } from "../types/form.types";
import { Submission, SubmissionData } from "../../submissioons/types/submission.types";
import { Controller, useForm } from 'react-hook-form'
import { Dropdown } from "primereact/dropdown";
import { TabView, TabPanel } from 'primereact/tabview';

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
    //create a form state with all the fields fetched from the api

    const [sections, setSections] = useState<Section[]>([]);
    const [fields, setFields] = useState<Field[]>([]);
    const [multipleChoiceFields, setMultipleChoiceFields] = useState<MultipleChoiceField[]>([]);
    const [singleChoiceFields, setSingleChoiceFields] = useState<SingleChoiceField[]>([]);

    //create submission form object
    const [filledForm, setFilledForm] = useState<Submission>({
        formId: formId as string,
        data: {
            fields: [],
            sections: []
        },
        date: new Date(),
    });



    const [recognizedForm, setRecognizedForm] = useState<any>({});

    const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilledForm({
            ...filledForm,
            data: {
                ...filledForm?.data,
                [name]: value
            }
        });
    }

    const [file, setFile] = useState<File>();
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const analyzePhoto = async (e: any) => {
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
        setFilledForm({
            ...filledForm,
            data: {
                ...filledForm?.data,
                fields: data
            }
        });

    }

    const [selectedCity, setSelectedCity] = useState<any>(null);
    interface City {
        name: string;
        code: string;
    }
    const cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    console.log('filledForm = ', filledForm)
    return (
        <div>
            <h1>Fill form - <u>{form?.title}</u></h1>
            <div>
                <TabView>
                    {
                        form?.sections.map((section: Section) => {
                            return (
                                <TabPanel header={`Section ${section.sectionNr}`}>
                                    <div>
                                        <h3>Section {section.sectionNr} </h3>
                                        {
                                            form?.fields.filter((field: Field) => field.sectionNr === section.sectionNr).map((field: Field) => {
                                                return (
                                                    <div>
                                                        {
                                                            <>
                                                            <label htmlFor="field">{field.label}</label>
                                                            <input type="text" placeholder={field.placeholder} />
                                                            </>
                                                            // field.fieldType === 'single-choice' && (
                                                            //     <div>
                                                            //         <Dropdown value={selectedCity} options={cities} optionLabel="name" placeholder="Select a City" className="w-full md:w-14rem" />
                                                            //     </div>
                                                            // )
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </TabPanel>
                            )
                        })
                    }
                </TabView>
                {/* {
                    form?.sections.map((section: Section) => {
                        return (
                            <div>
                                <h3>Section {section.sectionNr} </h3>

                                {form?.fields.filter((field: Field) => field.sectionNr === section.sectionNr).map((field: Field) => {
                                    return (
                                        <div>
                                            {
                                                field.fieldType === 'single-choice' && (
                                                    <div>
                                                        <Dropdown value={}  options={} optionLabel="name" placeholder="Select a City" className="w-full md:w-14rem" />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                })}


                            </div>

                        )
                    })
                }
                <br />
                <br />
                {
                    <div>
                        <input type="file" onChange={handleFileChange} />
                        <div>{file && `${file.name} - ${file.type}`}</div>
                        <button type="submit" onClick={analyzePhoto}>Scan buletin</button>
                    </div>
                }
                {/* {
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
                } */}
            </div>
        </div>
    )
}