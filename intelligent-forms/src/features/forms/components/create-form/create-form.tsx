
import { useEffect, useReducer, useState } from 'react'
import { Form, Field, Section, ChoiceField } from '../../types/form.types'
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { NewSection } from '../form-section';
import { TabView, TabPanel } from 'primereact/tabview';
import { AuthenticatedLayout } from '../../../../layouts/authenticated-layout/Authenticated.layout';
import * as yup from 'yup';
import './create-form.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { createForm } from '../../api/api.forms';

const schema = yup.object().shape({
    sectionNr: yup.number().required(),
    rtfText: yup.string().required(),
    documentType: yup.string().required(),
})


const formSchema = yup.object().shape({
    title: yup.string()
        .min(2, 'Title is Too Short!')
        .max(70, 'Title is Too Long!')
        .required(),
    fields: yup.array().required(),
    sections: yup.array().required(),
    dataRetention: yup.number().required(),
})


export const CreateForm = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState<number>(30);

    const [sections, setSections] = useState<Section[]>([{
        rtfText: '',
        documentType: 'None',
        sectionNr: 1,
    }])
    const [fields, setFields] = useState<Field[] | ChoiceField[]>([])
    const [title, setTitle] = useState<string>('')
    const [form, setForm] = useState<Form>({
        title: '',
        fields: [],
        sections: [],
        dataRetention: 30
    })

    useEffect(() => {
        setForm({ ...form, sections: sections, fields: fields, title: title, dataRetention: value })
    }, [sections, fields, title, value])


    const validateSections = () => {
        sections.map((section) => {
            schema.validate(section)
                .then()
                .catch((err) => {
                    alert('Section is not valid  ' + err)
                })
        })
    }

    const handleSubmit = () => {

        if (fields.length === 0) {
            alert('Please add at least one field')
            return
        }

        validateSections()

        formSchema.validate(form)
            .then(() => {
                createForm(form)
                    .then((res) => {
                        navigate('/dashboard/forms')
                    })
            })
            .catch((err) => {
                alert('Form is not valid  ' + err)
            })
    }


    return (
        <AuthenticatedLayout>
            <div className='create-form'>
                <div className='form-container'>
                    <h2 className='title'>Create a new form</h2>

                    <div className='step1'>
                        <h3 className='step-number'>Step 1:</h3>
                        <InputText
                            type="text"
                            placeholder="Add a title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className='step2'>
                        <h3 className='step-number'>Step 2:</h3>
                        <TabView>

                            {
                                sections.map((section, index) => {
                                    return (
                                        <TabPanel header={`Section ${section.sectionNr}`}>
                                            <NewSection
                                                sectionNr={index + 1}
                                                fields={fields}
                                                setFields={setFields}
                                                sections={sections}
                                                setSections={setSections}
                                            />
                                        </TabPanel>)
                                })
                            }

                            <TabPanel header={<Button
                                onClick={() =>
                                    setSections([...sections, {
                                        rtfText: '',
                                        documentType: 'None',
                                        sectionNr: sections.length + 1
                                    }])}
                                label="Add new section" />}>
                            </TabPanel>

                        </TabView>
                    </div>

                    <div className='step3'>
                        <h3 className='step-number'>Step 3:</h3>

                        <div>
                            <label className="font- bold block mb-2">Data retention period (1-60 Days)</label>
                            <InputNumber
                                value={value}
                                onValueChange={(e: InputNumberValueChangeEvent | any) => setValue(e.value)}
                                mode="decimal"
                                min={1} max={60}
                                allowEmpty={false}
                            />
                        </div>

                    </div>

                    <div className='step4'>
                        <Button onClick={handleSubmit} label="Create Form" />
                    </div>
                </div >
            </div >
        </AuthenticatedLayout>
    )

}

