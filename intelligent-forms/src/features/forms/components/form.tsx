import { useEffect, useReducer, useState } from 'react'

import { Form, Field, Section, SingleChoiceField, MultipleChoiceField } from '../types/form.types'
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { string } from 'zod';
import { Chips, ChipsChangeEvent } from 'primereact/chips';




export const CreateForm = () => {
    const [checked, toggle] = useReducer(checked => !checked, false);
    const [fieldType, setFieldType] = useState({ type: '' })
    const [fields, setFields] = useState<Field>({
        label: '',
        placeholder: '',
        fieldType: '',
        options: [],
        mandatory: false,
    })
    const [value, setValue] = useState<string[]>([]);

    const [form, setForm] = useState<Form>({
        title: '',
        fields: [],
        sections: [],
        dataRetention: 30,
    })

    const fieldTypes: any = [
        { type: 'Single Choice' },
        { type: 'Multiple Choice' },
        { type: 'Number' },
        { type: 'String' },
    ]
    const onSubmit = (data: any) => {
        data.preventDefault()
        console.log(data)
    }

    const addNewField = () => {
        const newField: Field = {
            label: '',
            placeholder: '',
            fieldType: fieldType.type,
            options: value,
            mandatory: checked,
        }
        setFields([...fields, newField])
        setForm({ ...form, fields: [...fields, newField] })
    }
    console.log(fieldType)
    return (
        <div className='create-form'>
            <form onSubmit={onSubmit}>
                <div className='step1'>
                    <h3 className='step-number'>Step 1:</h3>
                    <InputText type="text" placeholder="Add a title" />
                </div>
                <div className='step2'>
                    <h3 className='step-number'>Step 2:</h3>
                    <div className='section'>
                        <InputText type="text" placeholder="Label" />
                        <InputText type="text" placeholder="Placeholder keyword" />
                        <Dropdown value={fieldType} onChange={(e) => setFieldType(e.value)} options={fieldTypes} optionLabel="type"
                            placeholder="Select the type of choice" className="w-full md:w-14rem" />
                        <div className='options'>
                            {
                                fieldType.type === 'Single Choice' || fieldType.type === 'Multiple Choice' ?
                                    (<Chips value={value} onChange={(e: ChipsChangeEvent) => setValue(e.value)} />) : (<Chips disabled placeholder='Disabled' />)
                            }
                        </div>
                        <div className='mandatory'>
                            <Checkbox onChange={toggle} checked={checked}></Checkbox>
                            {
                                checked ? ' Mandatory' : ' Not Mandatory'
                            }
                        </div>
                        <Button label="Add dynamic field" onClick={addNewField} />
                    </div>
                </div>
            </form >
        </div >
    )

}