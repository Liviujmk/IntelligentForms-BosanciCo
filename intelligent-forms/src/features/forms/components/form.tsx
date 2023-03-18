
import { useEffect, useReducer, useState } from 'react'
import { Form, Field, Section, ChoiceField } from '../types/form.types'
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Chips, ChipsChangeEvent } from 'primereact/chips';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Panel } from 'primereact/panel';
import { Editor } from 'primereact/editor';
import { NewField } from './form-field';
import { NewSection } from './form-section';
import { TabView, TabPanel } from 'primereact/tabview';


export const CreateForm = () => {
    const [value, setValue] = useState<number | null>(null);

    const [sections, setSections] = useState<Section[]>([{
        rtfText: '',
        documentType: '',
        sectionNr: 1,
    }])

    const [form, setForm] = useState<Form>({
        title: '',
        fields: [],
        sections: [],
        dataRetention: 30
    })

    console.log('sections', sections)

    // get state from newfield
    const [field, setField] = useState<Field>({
        label: '',
        fieldType: '',
        mandatory: false,
        options: [],
        placeholder: '',
        sectionNr: 1,
    })


    return (
        <div className='create-form'>
            <div className='form-container'>
                <h2 className='title'>Create a new form</h2>

                <div className='step1'>
                    <h3 className='step-number'>Step 1:</h3>
                    <InputText type="text" placeholder="Add a title" />
                </div>

                <div className='step2'>
                    <h3 className='step-number'>Step 2:</h3>
                    <TabView>
                        {
                            sections.map((section, index) => {
                                return <TabPanel header={`Section ${index + 1}`}>
                                    <NewSection sectionNr={index + 1} />
                                </TabPanel>
                            })
                        }
                        <TabPanel header={<Button
                            onClick={() => setSections([...sections, {
                                rtfText: '',
                                documentType: '',
                                sectionNr: sections.length + 1
                            }])}
                            label="Add new section" />}>
                        </TabPanel>
                    </TabView>

                </div>

                <div className='step3'>
                    <h3 className='step-number'>Step 3:</h3>
                    <p>Data retention Period (in days)
                        <span>
                            <InputNumber value={value} onValueChange={(e: InputNumberValueChangeEvent) => setValue(e.value)} mode="decimal" showButtons min={0} max={100} />
                        </span>
                    </p>
                </div>

                <div className='step4'>
                    <Button>Create Form</Button>
                </div>

            </div >
        </div >
    )

}
{/* <Panel header="Section 1" toggleable className='p-panel'>
<div className='section'> */}
{/* <div className='field-section'>
<InputText type="text" placeholder="Label" value={field.label} onChange={(e) => setField({ ...field, label: e.target.value })} />
<InputText type="text" placeholder="Placeholder keyword" value={field.placeholder} onChange={(e) => setField({ ...field, placeholder: e.target.value })} />
<Dropdown value={fieldType} onChange={(e) => setFieldType(e.value)} options={fieldTypes} optionLabel="type"
placeholder="Select the type of choice" className="w-full md:w-14rem" />
<div className='options'>
{
                                        fieldType.type === 'Single Choice' || fieldType.type === 'Multiple Choice' ?
                                            (<Chips id='options-chips' value={value} onChange={(e: ChipsChangeEvent) => setValue(e.value)} separator={','} placeholder='Write your options here ' />) : (<Chips disabled placeholder='Disabled' />)
                                    }
                                </div>
                                <div className='mandatory'>
                                <Checkbox onChange={toggle} checked={checked}></Checkbox>
                                    {
                                        checked ? ' Mandatory' : ' Mandatory'
                                    }
                                </div>
                                <Button label="Add dynamic field" onClick={addNewField} />
                            </div> */}

{/* <div className='rtf-section'>
                                <h4>Add text here</h4>
                                <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />
                            </div>
                            </div>
                    </Panel> */}
// const [value, setValue] = useState<string[]>([]);
// const [text, setText] = useState<string | null>('');
// const [form, setForm] = useState<Form>({
//     title: '',
//     fields: [],
//     sections: [],
//     dataRetention: 30,
// })

// const fieldTypes: any = [
//     { type: 'Single Choice' },
//     { type: 'Multiple Choice' },
//     { type: 'Number' },
//     { type: 'String' },
// ]
// const [field, setField] = useState<Field | any>({
//     label: '',
//     placeholder: '',
//     fieldType: '',
//     options: [],
//     mandatory: false,
// })
// console.log('field', field)
{/* <TabPanel header="Section 1">
                            {addSection[0]}
                        </TabPanel> */}

{/* {
                            addSection.map((element, index) => {
                                return <TabPanel header={`Section ${index + 2}`}>
                                    <NewSection sectionNr={index + 2}
                                    />
                                </TabPanel>
                            })
                        } */}

{/* {
                            addSection.map((element, index) => {
                                return <TabPanel header={`Section ${index + 1}`}>
                                    <NewSection sectionNr={index + 1}
                                    />
                                </TabPanel>
                            })
                        }
                        
                        <TabPanel header={<Button
                            onClick={() => setAddSection([...addSection, <NewSection />])}
                            label="Add new section" />}>
                        </TabPanel> */}
