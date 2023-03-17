import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { useParams } from "react-router-dom";

import { API_PATH_LOCAL, API_PATH_PROD } from "../../../config/api";

import { getForm } from "../../forms/api/api.forms";
import { capitalizeFirstLetter, capitalizeString,lowercaseString } from "../utils/input.functions";
import { createSubmission, analyzeIdentityCard, analyzePassport } from "../api/fill.api";

import './fill-form.css'
import { Form, Field, Section, ChoiceField } from "../../forms/types/form.types";
import { Submission, SubmissionData, SubmissionField } from "../../submissioons/types/submission.types";
import { Controller, useForm } from 'react-hook-form'
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { TabView, TabPanel } from 'primereact/tabview';
import { BaseLayout } from "../../../layouts/base-layout/base.layout";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { Editor } from "primereact/editor";

//import fill layouts
import { TabHeaderTemplate } from "../layouts/layouts.fill";
import { Button } from "primereact/button";

export const FillForm = () => {
    const { formId } = useParams();
    
    if (localStorage.getItem(`formId`)=== formId) return <h1>Thanks for submitting this form! xD</h1>
    //fetch form from (url) api and set it to form state
    const [form, setForm] = useState<Form | null>(null);
    const [sections, setSections] = useState<Section[]>([]);
    const [fields, setFields] = useState<any[]>([]);
    const [choiceFields, setChoiceFields] = useState<any[]>([]);
    const [preview , setPreview] = useState<any>([]);
    const [previewClone , setPreviewClone] = useState<any>([]);
    const [previewDynamicFieldsIndex , setPreviewDynamicFieldsIndex] = useState<any>([]);
    

    //fetch form from (url) api and set it to form state
    async function fetchForm() {
        const form = await getForm(formId as string);
        setForm(form);
        setSections(form?.sections);
        setFields(form?.fields);
        setChoiceFields(form?.fields.filter((field: Field) => field.fieldType.includes('choice')));
        console.log('form = ', form)
    }
    useEffect(() => {
        fetchForm();
    }, []);


    //set fetched-form fields to state
    const [formFields, setFormFields] = useState<SubmissionField[]>([
        {
            label: '',
            value: '',
        }
    ]);
    useEffect(() => {
        // set preview from rtfText from each section
        setPreview(form?.sections.map((section: Section) => {
            return section.rtfText;
        }).join('').split(' '));

        setPreviewClone(form?.sections.map((section: Section) => {
            return section.rtfText;
        }).join('').split(' '));

        // set formFields from fields
        setFormFields(fields.map((field: Field) => {
            return {
                label: field.label,
                value: '',
            }
        }));

    }, [fields]);


    //create a new array with the position of the dynamic fields {} in the preview array
    useEffect(() => {
        setPreviewDynamicFieldsIndex(previewClone?.map((word: string, index: number) => {
            if (word.includes('{') && word.includes('}')) {
                return index;
            }
        }).filter((index: number) => index !== undefined));
    }, [previewClone?.length]);


    //create submission object ------->
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
                rtfText: preview?.join(' '),
            }
        });
    }, [formFields]);
    //create submission object ------->


    const handleFieldChange = (e: ChangeEvent<HTMLInputElement> | CalendarChangeEvent) => {
        const { name, value } = e.target;
        // update preview state with the values of the dynamic fields
        previewDynamicFieldsIndex?.forEach((index: number) => {
            if (previewClone[index].includes(name)) {
                preview[index] = value;
            }
        });

        setFilledForm({
            ...filledForm,
            data: {
                ...filledForm?.data,
                // @ts-ignore
                fields: filledForm?.data?.fields.map((field: SubmissionField) => {
                    if (capitalizeString(field.label).split(" ").join("")  === capitalizeString(name)) {
                        return {
                            ...field,
                            value: value
                        }
                    }
                    return field;
                }),
                rtfText: preview?.join(' '),
            }
        });
    }

    const analyzePhoto = async (e: FileUploadHandlerEvent, sectionDocumentType: string) => {
        let data: any = {};
        console.log(lowercaseString(sectionDocumentType))
        if(lowercaseString(sectionDocumentType).includes('ident') && !lowercaseString(sectionDocumentType).includes('car ident')) {
            data = await analyzeIdentityCard(e)
        } else if (sectionDocumentType.includes('passport')) {
            data = await analyzePassport(e)
        } else console.log("Your document is not supported yet.")
        const keys = Object.keys(data);

        previewDynamicFieldsIndex?.forEach((index: number) => {
            keys.forEach((key: string) => {
                if (previewClone[index].includes(lowercaseString(key))) {
                    preview[index] = data[key].value;
                }
            });
        });
        
        setFilledForm({
            ...filledForm,
            data: {
                ...filledForm?.data,
                fields: filledForm?.data?.fields.map((field: SubmissionField) => {
                    if (keys.includes(field.label)) {
                        return {
                            ...field,
                            value: data[field.label].value,
                        }
                    }
                    return field;
                }),
                rtfText: preview?.join(' '),
            }
        });

    }
    
    console.log('filledForm = ', filledForm)

    return (
        <div className="page-container">
            <h1>Fill form - <u>{form?.title}</u></h1>
            <div className="fill-container">
                <TabView>
                    {
                        form?.sections.map((section: Section) => {
                            return (
                                <TabPanel header={`Section ${section.sectionNr}`} headerTemplate={TabHeaderTemplate}>
                                    <Card>
                                        <div>
                                            <FileUpload customUpload uploadHandler={
                                                (e: FileUploadHandlerEvent) => analyzePhoto(e, section.documentType)
                                            } className="form-btn" mode="basic" accept="image/*" maxFileSize={1000000} auto chooseLabel={'Scan ' + section.documentType} />
                                        </div>
                                        {
                                            form?.fields.filter((field: Field|ChoiceField) => field.sectionNr === section.sectionNr).map((field: Field|ChoiceField) => {
                                                return (
                                                    <div className="input-container">
                                                        {

                                                            field.fieldType === 'number' && (
                                                                <div>
                                                                    <div className="asterisk-madatory">
                                                                        {
                                                                            field.mandatory && (
                                                                                <span className="asterisk">*</span>
                                                                            )
                                                                        }
                                                                    </div>
                                                                    <span className="p-float-label">
                                                                        <InputText id="number-input" keyfilter="num" onChange={handleFieldChange} name={field.placeholder} 
                                                                        value={filledForm?.data?.fields.find((f: SubmissionField) => f.label === field.label)?.value} />
                                                                        <label htmlFor="number-input">{capitalizeFirstLetter(field.label)}</label>
                                                                    </span>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            field.fieldType === 'string' && (
                                                                <div>
                                                                    <div className="asterisk-madatory">
                                                                        {
                                                                            field.mandatory && (
                                                                                <span className="asterisk">*</span>
                                                                            )
                                                                        }
                                                                    </div>
                                                                    <span className="p-float-label">
                                                                        <InputText id="username" onChange={handleFieldChange} name={field.placeholder} value={filledForm?.data?.fields.find((f: SubmissionField) => f.label === field.label)?.value} />
                                                                        <label htmlFor="username">{capitalizeFirstLetter(field.label)}</label>
                                                                    </span>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            field.fieldType === 'date' && (
                                                                <div>
                                                                    <div className="asterisk-madatory">
                                                                        {
                                                                            field.mandatory && (
                                                                                <span className="asterisk">*</span>
                                                                            )
                                                                        }
                                                                    </div>
                                                                    <span className="p-float-label">
                                                                        <Calendar id="date-input" dateFormat="dd/mm/yy" onChange={handleFieldChange} name={field.placeholder} value={filledForm?.data?.fields.find((f: SubmissionField) => f.label === field.label)?.value} />
                                                                        <label htmlFor="date-input">{capitalizeFirstLetter(field.label)}</label>
                                                                    </span>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            field.fieldType === 'single-choice' && (
                                                                <div>
                                                                    <div className="asterisk-madatory">
                                                                        {
                                                                            field.mandatory && (
                                                                                <span className="asterisk">*</span>
                                                                            )
                                                                        }
                                                                    </div>
                                                                    <span className="p-float-label">
                                                                        <Dropdown optionLabel="name" 
                                                                            showClear 
                                                                            // @ts-ignore
                                                                            options={field.options}
                                                                            value={filledForm?.data?.fields.find((f: SubmissionField) => f.label === field.label)?.value}
                                                                            onChange={(e: DropdownChangeEvent) => {
                                                                                previewDynamicFieldsIndex?.forEach((index: number) => {
                                                                                    if (previewClone[index].includes(lowercaseString(field.label))) {
                                                                                        (e.value?.name) ? preview[index] = e.value?.name : preview[index] = e.value;
                                                                                    }
                                                                                });
                                                                                setFilledForm({
                                                                                    ...filledForm,
                                                                                    data: {
                                                                                        ...filledForm?.data,
                                                                                        fields: filledForm?.data?.fields.map((f: SubmissionField) => {
                                                                                            if (f.label === field.label) {
                                                                                                return {
                                                                                                    ...f,
                                                                                                    value: e.value,
                                                                                                }
                                                                                            }
                                                                                            return f;
                                                                                        }),
                                                                                        rtfText: preview.join(' '),
                                                                                    }
                                                                                });
                                                                                console.log('preview = ', preview)
                                                                            }}
                                                                            placeholder={field.label}
                                                                        />
                                                                        <label>{capitalizeFirstLetter(field.label)}</label>
                                                                    </span>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            field.fieldType === 'multiple-choice' && (
                                                                <div>
                                                                    <div className="asterisk-madatory">
                                                                        {
                                                                            field.mandatory && (
                                                                                <span className="asterisk">*</span>
                                                                            )
                                                                        }
                                                                    </div>
                                                                    <span className="p-float-label">
                                                                        <MultiSelect optionLabel="name"
                                                                            // @ts-ignore
                                                                            options={field.options}
                                                                            value={filledForm?.data?.fields.find((f: SubmissionField) => f.label === field.label)?.value}
                                                                            onChange={(e) => {
                                                                                previewDynamicFieldsIndex?.forEach((index: number) => {
                                                                                    if (previewClone[index].includes(field.placeholder)) {
                                                                                        preview[index] = e.value.map((v: any) => v.name).join(', ');
                                                                                    }
                                                                                });
                                                                                setFilledForm({
                                                                                    ...filledForm,
                                                                                    data: {
                                                                                        ...filledForm?.data,
                                                                                        fields: filledForm?.data?.fields.map((f: SubmissionField) => {
                                                                                            if (f.label === field.label) {
                                                                                                return {
                                                                                                    ...f,
                                                                                                    value: e.value,
                                                                                                }
                                                                                            }
                                                                                            return f;
                                                                                        }),
                                                                                        rtfText: preview.join(' '),
                                                                                    }
                                                                                });
                                                                            }}
                                                                            placeholder={field.label}
                                                                        />
                                                                        <label>{capitalizeFirstLetter(field.label)}</label>
                                                                    </span>
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
                    <TabPanel header={`Preview`} headerTemplate={TabHeaderTemplate}>
                        <Card>
                            <Editor readOnly value={filledForm?.data?.rtfText} style={{ height: '320px' }} />
                        </Card>
                    </TabPanel>
                </TabView>
                <div className="submit-group">
                {
                    filledForm?.data?.fields.every((field: SubmissionField) => (
                        form?.fields.find((f: Field|ChoiceField) => f.label === field.label)?.mandatory === false || (field.value !== '' && field.value !== null && field.value !== undefined && field.value.length !== 0)
                    )) 
                    && filledForm?.data?.rtfText !== '' 
                    && form?.fields.filter((field: Field|ChoiceField) => (!lowercaseString(field.fieldType).includes("choice") && !lowercaseString(field.fieldType).includes("date") )).every((field: Field|ChoiceField) => filledForm?.data?.fields.find((f: SubmissionField) => f.label === field.label)?.value.charAt(0) !== ' ')
                    ? (
                        <Button label="Submit" 
                            onClick={() => {
                                createSubmission(filledForm);
                            }}
                        />
                    ) : (
                        <Button label="Submit" disabled />
                    )
                }
                </div>
            </div>
        </div>
    )
}