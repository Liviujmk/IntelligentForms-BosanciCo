import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { useParams } from "react-router-dom";

import { API_PATH_LOCAL, API_PATH_PROD } from "../../../config/api";

import { getForm } from "../../forms/api/api.forms";
import {
    capitalizeFirstLetter,
    capitalizeString,
    lowercaseString,
} from "../utils/input.functions";
import {
    createSubmission,
    analyzeIdentityCard,
    analyzePassport,
    analyzeBirthCertificate,
    analyzeCarIdentity,
} from "../api/fill.api";

import "./fill-form.css";
import {
    Form,
    Field,
    Section,
    ChoiceField,
} from "../../forms/types/form.types";
import {
    Submission,
    SubmissionData,
    SubmissionField,
} from "../../submissioons/types/submission.types";
import { Controller, useForm } from "react-hook-form";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { TabView, TabPanel } from "primereact/tabview";
import { BaseLayout } from "../../../layouts/base-layout/base.layout";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { Editor } from "primereact/editor";
import { Dialog } from "primereact/dialog";

//import fill layouts
import { TabHeaderTemplate, editorHead } from "../layouts/layouts.fill";

import { Button } from "primereact/button";

export const FillForm = () => {
    const { formId } = useParams();

    //add loading state
    const [loading, setLoading] = useState<boolean>(false);
    const [loading2, setLoading2] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    //fetch form from (url) api and set it to form state
    const [form, setForm] = useState<Form | null>(null);
    const [sections, setSections] = useState<Section[]>([]);
    const [fields, setFields] = useState<any[]>([]);
    const [choiceFields, setChoiceFields] = useState<any[]>([]);
    const [preview, setPreview] = useState<any>([]);
    const [previewClone, setPreviewClone] = useState<any>([]);
    const [previewDynamicFieldsIndex, setPreviewDynamicFieldsIndex] =
        useState<any>([]);

    //fetch form from (url) api and set it to form state
    async function fetchForm() {
        setLoading2(true);
        const form = await getForm(formId as string).then((res) => {
            setLoading2(false);
            return res;
        });
        setForm(form);
        setSections(form?.sections);
        setFields(form?.fields);
        setChoiceFields(
            form?.fields.filter((field: Field) =>
                field.fieldType.includes("choice")
            )
        );
        console.log("form = ", form);
    }
    useEffect(() => {
        fetchForm();
    }, []);

    // if(!form) {
    //     return <div>Loading...</div>
    // }

    //set fetched-form fields to state
    const [formFields, setFormFields] = useState<SubmissionField[]>([
        {
            label: "",
            value: "",
            keyword: "",
        },
    ]);
    useEffect(() => {
        // set preview from rtfText from each section
        setPreview(
            form?.sections
                .map((section: Section) => {
                    return section.rtfText;
                })
                .join("")
                .split(" ")
        );

        setPreviewClone(
            form?.sections
                .map((section: Section) => {
                    return section.rtfText;
                })
                .join("")
                .split(" ")
        );

        // set formFields from fields
        setFormFields(
            fields.map((field: Field) => {
                return {
                    label: field.label,
                    value: "",
                    keyword: field.keyword,
                };
            })
        );
    }, [fields, preview?.length, previewClone?.length]);

    //create a new array with the position of the dynamic fields {} in the preview array
    useEffect(() => {
        setPreviewDynamicFieldsIndex(
            previewClone
                ?.map((word: string, index: number) => {
                    if (word.includes("{") && word.includes("}")) {
                        return index;
                    }
                })
                .filter((index: number) => index !== undefined)
        );
    }, [previewClone?.length]);

    // replace the dynamic fields in the preview array with '__' and set it to preview state
    useEffect(() => {
        previewDynamicFieldsIndex?.forEach((index: number) => {
            preview[index] = "__________";
        });
        setPreview(preview);
        console.log("preview >>>>>> ", preview);
    }, [formFields]);

    //create submission object ------->
    const [filledForm, setFilledForm] = useState<any>({
        formId: formId as string,
        data: {
            fields: [],
            rtfText: "",
        },
        date: new Date(),
    });
    useEffect(() => {
        setFilledForm({
            ...filledForm,
            data: {
                ...filledForm?.data,
                fields: formFields,
                rtfText: preview.join(" "),
            },
        });
    }, [formFields]);
    //create submission object ------->

    const handleFieldChange = (
        e: ChangeEvent<HTMLInputElement> | CalendarChangeEvent
    ) => {
        const { name, value, id } = e.target;
        // update preview state with the values of the dynamic fields
        previewDynamicFieldsIndex?.forEach((index: number) => {
            if (previewClone[index].includes(`{${name}`)) {
                // @ts-ignore
                if (value === "" || value === null || value === undefined) {
                    preview[index] = "__________";
                } else if (id.includes("date") && value != null) {
                    // @ts-ignore
                    preview[index] = value.toLocaleDateString("en-UK");
                    // @ts-ignore
                } else if (!id.includes("date") && value.charAt(0) === " ") {
                    preview[index] = "__________";
                } else {
                    preview[index] = value;
                }
            }
        });

        setFilledForm({
            ...filledForm,
            data: {
                ...filledForm?.data,
                // @ts-ignore
                fields: filledForm?.data?.fields.map(
                    (field: SubmissionField) => {
                        if (
                            capitalizeString(field.label)
                                .split(" ")
                                .join("") === capitalizeString(name)
                        ) {
                            return {
                                ...field,
                                value: value,
                            };
                        }
                        return field;
                    }
                ),
                rtfText: preview?.join(" "),
            },
        });
    };

    const [fileState, setFileState] = useState<any>(null);
    const analyzePhoto = async (
        e: FileUploadHandlerEvent,
        sectionDocumentType: string
    ) => {
        // check file size and return if too big
        if (e.files[0].size > 10000000) {
            setFileState(
                "File size is too big. Please upload a file less than 10MB."
            );
            return;
        }
        console.log(e.files[0].name);

        // assign data
        let data: any = {};
        if (
            lowercaseString(sectionDocumentType).includes("bulet") ||
            (lowercaseString(sectionDocumentType).includes("ident") &&
                !lowercaseString(sectionDocumentType).includes("car ident"))
        ) {
            setFileState(
                "Așteptați! Formularul se autocompletează cu fișierul scanat..."
            );
            data = await analyzeIdentityCard(e);
        } else if (
            lowercaseString(sectionDocumentType).includes("passport") ||
            lowercaseString(sectionDocumentType).includes("pasaport") ||
            lowercaseString(sectionDocumentType).includes("port")
        ) {
            setFileState(
                "Așteptați! Formularul se autocompletează cu fișierul scanat..."
            );
            data = await analyzePassport(e);
        } else if (
            lowercaseString(sectionDocumentType).includes("car ident") ||
            lowercaseString(sectionDocumentType).includes("documentul")
        ) {
            setFileState(
                "Așteptați! Formularul se autocompletează cu fișierul scanat..."
            );
            data = await analyzeCarIdentity(e);
        } else if (
            lowercaseString(sectionDocumentType).includes("birth cert") ||
            lowercaseString(sectionDocumentType).includes("certificat")
        ) {
            setFileState(
                "Așteptați! Formularul se autocompletează cu fișierul scanat..."
            );
            data = await analyzeBirthCertificate(e);
        } else {
            setFileState("Document not supported yet.");
            console.log("Your document is not supported yet.");
            return;
        }
        const keys = Object.keys(data);

        // if keys are equal to the keyword of form.fields, then update preview state with the values of the dynamic fields and also update the filledForm state
        previewDynamicFieldsIndex?.forEach((index: number) => {
            keys.forEach((key: string) => {
                form?.fields.forEach((field: Field) => {
                    if (
                        lowercaseString(key).includes(
                            lowercaseString(field.keyword)
                        )
                    ) {
                        if (
                            lowercaseString(previewClone[index]).includes(
                                `{${lowercaseString(field.placeholder)}`
                            )
                        ) {
                            data[key].kind === "date"
                                ? (preview[index] = new Date(
                                      data[key].value
                                  ).toLocaleDateString("en-UK"))
                                : (preview[index] = data[key].value);
                        }
                    }
                });
            });
        });

        setFilledForm({
            ...filledForm,
            data: {
                ...filledForm?.data,
                fields: filledForm?.data?.fields.map(
                    (field: SubmissionField) => {
                        if (keys.includes(field.keyword)) {
                            if (data[field.keyword].kind === "date") {
                                return {
                                    ...field,
                                    value: new Date(data[field.keyword].value),
                                };
                            }
                            return {
                                ...field,
                                value: data[field.keyword].value,
                            };
                        }
                        return field;
                    }
                ),
                rtfText: preview?.join(" "),
            },
        });
    };

    console.log("filledForm", filledForm);
    console.log("preview", preview);

    return (
        <div className="page-container">
            <h1>{loading2 ? <>Se încarcă formularul...</> : form?.title}</h1>
            <div className="fill-container">
                <TabView>
                    {form?.sections.map((section: Section) => {
                        return (
                            <TabPanel
                                header={`Secțiunea ${section.sectionNr}`}
                                headerTemplate={TabHeaderTemplate}
                            >
                                <Card>
                                    <div>
                                        <Dialog
                                            header="Auto-completare"
                                            visible={visible}
                                            onHide={() => setVisible(false)}
                                            style={{ width: "50vw" }}
                                            breakpoints={{
                                                "960px": "75vw",
                                                "641px": "100vw",
                                            }}
                                        >
                                            <p className="m-0">
                                                {<span>{fileState}</span>}
                                            </p>
                                        </Dialog>
                                        {lowercaseString(
                                            section.documentType
                                        ) !== "none" && (
                                            <FileUpload
                                                customUpload
                                                uploadHandler={(
                                                    e: FileUploadHandlerEvent
                                                ) => {
                                                    setVisible(true);
                                                    analyzePhoto(
                                                        e,
                                                        section.documentType
                                                    ).then(() => {
                                                        setVisible(false);
                                                    });
                                                }}
                                                className="form-btn"
                                                mode="basic"
                                                accept="image/*"
                                                maxFileSize={10000000}
                                                auto
                                                chooseLabel={
                                                    "Scanează " +
                                                    section?.documentType
                                                }
                                            />
                                        )}
                                    </div>
                                    {form?.fields
                                        .filter(
                                            (field: Field | ChoiceField) =>
                                                field.sectionNr ===
                                                section.sectionNr
                                        )
                                        .map((field: any) => {
                                            return (
                                                <div className="input-container">
                                                    {lowercaseString(
                                                        field.fieldType
                                                    ) === "number" && (
                                                        <div>
                                                            <div className="asterisk-madatory">
                                                                {field.mandatory && (
                                                                    <span className="asterisk">
                                                                        *
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="p-float-label">
                                                                <InputText
                                                                    maxLength={
                                                                        25
                                                                    }
                                                                    id="number-input"
                                                                    keyfilter="num"
                                                                    onChange={
                                                                        handleFieldChange
                                                                    }
                                                                    name={
                                                                        field.placeholder
                                                                    }
                                                                    value={
                                                                        filledForm?.data?.fields.find(
                                                                            (
                                                                                f: SubmissionField
                                                                            ) =>
                                                                                f.label ===
                                                                                field.label
                                                                        )
                                                                            ?.value ||
                                                                        ""
                                                                    }
                                                                />
                                                                <label htmlFor="number-input">
                                                                    {capitalizeFirstLetter(
                                                                        field.label
                                                                    )}
                                                                </label>
                                                            </span>
                                                        </div>
                                                    )}
                                                    {lowercaseString(
                                                        field.fieldType
                                                    ) === "decimal" && (
                                                        <div>
                                                            <div className="asterisk-madatory">
                                                                {field.mandatory && (
                                                                    <span className="asterisk">
                                                                        *
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="p-float-label">
                                                                <InputText
                                                                    maxLength={
                                                                        25
                                                                    }
                                                                    id="decimal-input"
                                                                    keyfilter="int"
                                                                    onChange={
                                                                        handleFieldChange
                                                                    }
                                                                    name={
                                                                        field.placeholder
                                                                    }
                                                                    value={
                                                                        filledForm?.data?.fields.find(
                                                                            (
                                                                                f: SubmissionField
                                                                            ) =>
                                                                                f.label ===
                                                                                field.label
                                                                        )?.value
                                                                    }
                                                                />
                                                                <label htmlFor="decimal-input">
                                                                    {capitalizeFirstLetter(
                                                                        field.label
                                                                    )}
                                                                </label>
                                                            </span>
                                                        </div>
                                                    )}
                                                    {lowercaseString(
                                                        field.fieldType
                                                    ) === "text" && (
                                                        <div>
                                                            <div className="asterisk-madatory">
                                                                {field.mandatory && (
                                                                    <span className="asterisk">
                                                                        *
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="p-float-label">
                                                                <InputText
                                                                    maxLength={
                                                                        35
                                                                    }
                                                                    keyfilter={
                                                                        /^[^~<>*!?/!@#$%&=+.:;'"`,}{]+$/
                                                                    }
                                                                    id="username"
                                                                    onChange={
                                                                        handleFieldChange
                                                                    }
                                                                    name={
                                                                        field.placeholder
                                                                    }
                                                                    value={
                                                                        filledForm?.data?.fields.find(
                                                                            (
                                                                                f: SubmissionField
                                                                            ) =>
                                                                                f.label ===
                                                                                field.label
                                                                        )?.value
                                                                    }
                                                                />
                                                                <label htmlFor="username">
                                                                    {capitalizeFirstLetter(
                                                                        field.label
                                                                    )}
                                                                </label>
                                                            </span>
                                                        </div>
                                                    )}
                                                    {lowercaseString(
                                                        field.fieldType
                                                    ) === "date" && (
                                                        <div>
                                                            <div className="asterisk-madatory">
                                                                {field.mandatory && (
                                                                    <span className="asterisk">
                                                                        *
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="p-float-label">
                                                                <Calendar
                                                                    touchUI
                                                                    showButtonBar
                                                                    showIcon
                                                                    id="date-input"
                                                                    dateFormat="dd/mm/yy"
                                                                    onChange={
                                                                        handleFieldChange
                                                                    }
                                                                    name={
                                                                        field.placeholder
                                                                    }
                                                                    value={
                                                                        filledForm?.data?.fields.find(
                                                                            (
                                                                                f: SubmissionField
                                                                            ) =>
                                                                                f.label ===
                                                                                field.label
                                                                        )?.value
                                                                    }
                                                                />
                                                                <label htmlFor="date-input">
                                                                    {capitalizeFirstLetter(
                                                                        field.label
                                                                    )}
                                                                </label>
                                                            </span>
                                                        </div>
                                                    )}
                                                    {lowercaseString(
                                                        field.fieldType
                                                    ) === "single-choice" && (
                                                        <div>
                                                            <div className="asterisk-madatory">
                                                                {field.mandatory && (
                                                                    <span className="asterisk">
                                                                        *
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="p-float-label">
                                                                <Dropdown
                                                                    optionLabel="name"
                                                                    showClear
                                                                    // @ts-ignore
                                                                    options={
                                                                        field.options
                                                                    }
                                                                    value={
                                                                        filledForm?.data?.fields.find(
                                                                            (
                                                                                f: SubmissionField
                                                                            ) =>
                                                                                f.label ===
                                                                                field.label
                                                                        )?.value
                                                                    }
                                                                    onChange={(
                                                                        e: DropdownChangeEvent
                                                                    ) => {
                                                                        previewDynamicFieldsIndex?.forEach(
                                                                            (
                                                                                index: number
                                                                            ) => {
                                                                                if (
                                                                                    previewClone[
                                                                                        index
                                                                                    ].includes(
                                                                                        lowercaseString(
                                                                                            field.label
                                                                                        )
                                                                                    )
                                                                                ) {
                                                                                    e
                                                                                        .value
                                                                                        ?.name
                                                                                        ? (preview[
                                                                                              index
                                                                                          ] =
                                                                                              e.value?.name)
                                                                                        : (preview[
                                                                                              index
                                                                                          ] =
                                                                                              "__________");
                                                                                }
                                                                            }
                                                                        );
                                                                        setFilledForm(
                                                                            {
                                                                                ...filledForm,
                                                                                data: {
                                                                                    ...filledForm?.data,
                                                                                    fields: filledForm?.data?.fields.map(
                                                                                        (
                                                                                            f: SubmissionField
                                                                                        ) => {
                                                                                            if (
                                                                                                f.label ===
                                                                                                field.label
                                                                                            ) {
                                                                                                return {
                                                                                                    ...f,
                                                                                                    value: e.value,
                                                                                                };
                                                                                            }
                                                                                            return f;
                                                                                        }
                                                                                    ),
                                                                                    rtfText:
                                                                                        preview.join(
                                                                                            " "
                                                                                        ),
                                                                                },
                                                                            }
                                                                        );
                                                                        console.log(
                                                                            "preview = ",
                                                                            preview
                                                                        );
                                                                    }}
                                                                    placeholder={
                                                                        field.label
                                                                    }
                                                                />
                                                                <label>
                                                                    {capitalizeFirstLetter(
                                                                        field.label
                                                                    )}
                                                                </label>
                                                            </span>
                                                        </div>
                                                    )}
                                                    {lowercaseString(
                                                        field.fieldType
                                                    ) === "multiple-choice" && (
                                                        <div>
                                                            <div className="asterisk-madatory">
                                                                {field.mandatory && (
                                                                    <span className="asterisk">
                                                                        *
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="p-float-label">
                                                                <MultiSelect
                                                                    optionLabel="name"
                                                                    // @ts-ignore
                                                                    options={
                                                                        field.options
                                                                    }
                                                                    value={
                                                                        filledForm?.data?.fields.find(
                                                                            (
                                                                                f: SubmissionField
                                                                            ) =>
                                                                                f.label ===
                                                                                field.label
                                                                        )?.value
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        previewDynamicFieldsIndex?.forEach(
                                                                            (
                                                                                index: number
                                                                            ) => {
                                                                                if (
                                                                                    previewClone[
                                                                                        index
                                                                                    ].includes(
                                                                                        field.placeholder
                                                                                    )
                                                                                ) {
                                                                                    e
                                                                                        .value
                                                                                        ?.length
                                                                                        ? (preview[
                                                                                              index
                                                                                          ] =
                                                                                              e.value
                                                                                                  .map(
                                                                                                      (
                                                                                                          v: any
                                                                                                      ) =>
                                                                                                          v.name
                                                                                                  )
                                                                                                  .join(
                                                                                                      ", "
                                                                                                  ))
                                                                                        : (preview[
                                                                                              index
                                                                                          ] =
                                                                                              "__________");
                                                                                }
                                                                            }
                                                                        );
                                                                        setFilledForm(
                                                                            {
                                                                                ...filledForm,
                                                                                data: {
                                                                                    ...filledForm?.data,
                                                                                    fields: filledForm?.data?.fields.map(
                                                                                        (
                                                                                            f: SubmissionField
                                                                                        ) => {
                                                                                            if (
                                                                                                f.label ===
                                                                                                field.label
                                                                                            ) {
                                                                                                return {
                                                                                                    ...f,
                                                                                                    value: e.value,
                                                                                                };
                                                                                            }
                                                                                            return f;
                                                                                        }
                                                                                    ),
                                                                                    rtfText:
                                                                                        preview.join(
                                                                                            " "
                                                                                        ),
                                                                                },
                                                                            }
                                                                        );
                                                                    }}
                                                                    placeholder={
                                                                        field.label
                                                                    }
                                                                />
                                                                <label>
                                                                    {capitalizeFirstLetter(
                                                                        field.label
                                                                    )}
                                                                </label>
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                </Card>
                            </TabPanel>
                        );
                    })}
                    <TabPanel
                        header={`Previzualizare`}
                        headerTemplate={TabHeaderTemplate}
                        style={
                            loading2
                                ? { pointerEvents: "none", opacity: "0" }
                                : { pointerEvents: "auto", opacity: "1" }
                        }
                    >
                        <Card>
                            <Editor
                                readOnly
                                value={filledForm?.data?.rtfText}
                                style={{ height: "320px" }}
                                headerTemplate={editorHead}
                            />
                        </Card>
                    </TabPanel>
                </TabView>
                <div
                    className="submit-group"
                    style={
                        loading2
                            ? { pointerEvents: "none", opacity: "0" }
                            : { pointerEvents: "auto", opacity: "1" }
                    }
                >
                    {filledForm?.data?.fields.every(
                        (field: SubmissionField) =>
                            form?.fields.find(
                                (f: Field | ChoiceField) =>
                                    f.label === field.label
                            )?.mandatory === false ||
                            (field.value !== "" &&
                                field.value !== null &&
                                field.value !== undefined &&
                                field.value.length !== 0)
                    ) &&
                    filledForm?.data?.rtfText !== "" &&
                    form?.fields
                        .filter(
                            (field: Field | ChoiceField) =>
                                !lowercaseString(field.fieldType).includes(
                                    "choice"
                                ) &&
                                !lowercaseString(field.fieldType).includes(
                                    "date"
                                )
                        )
                        .every(
                            (field: Field | ChoiceField) =>
                                filledForm?.data?.fields
                                    .find(
                                        (f: SubmissionField) =>
                                            f.label === field.label
                                    )
                                    ?.value.charAt(0) !== " "
                        ) ? (
                        <Button
                            label="Trimite răspuns"
                            onClick={() => {
                                // setfilledform date when submit
                                setFilledForm({
                                    ...filledForm,
                                    date: new Date(),
                                });
                                setLoading(true);
                                createSubmission(filledForm);
                            }}
                            loading={loading}
                        />
                    ) : (
                        <Button
                            label="Completează câmpurile obligatorii"
                            disabled
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
