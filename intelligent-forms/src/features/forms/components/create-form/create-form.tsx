
import { useEffect, useReducer, useState } from 'react'
import { Form, Field, Section, ChoiceField } from '../../types/form.types'
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Chips, ChipsChangeEvent } from 'primereact/chips';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Panel } from 'primereact/panel';
import { Editor } from 'primereact/editor';
import { NewField } from '../form-field';
import { NewSection } from '../form-section';
import { TabView, TabPanel } from 'primereact/tabview';
import './create-form.css'

export const CreateForm = () => {
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



    useEffect(() => {
        console.log('fieldsfromParent', fields)
    }, [fields])


    useEffect(() => {
        console.log('sectionsFromParent', sections)
    }, [sections])



    return (
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
                            onValueChange={(e: InputNumberValueChangeEvent) => setValue(e.value)}
                            mode="decimal"
                            min={1} max={60}
                            allowEmpty={false}
                        />
                    </div>

                </div>

                <div className='step4'>
                    <Button onClick={() => console.log('form', form)}>
                        Create Form
                    </Button>
                </div>
            </div >
        </div >
    )

}

