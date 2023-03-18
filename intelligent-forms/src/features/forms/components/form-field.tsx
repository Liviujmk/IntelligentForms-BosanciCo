
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
import { string } from 'zod';
interface Props {
    sectionNr: number
}

export const NewField = ({ sectionNr }: Props) => {
    const [field, setField] = useState<Field | any>({
        label: '',
        placeholder: '',
        fieldType: '',
        options: [],
        mandatory: false,
        sectionNr: '',
    })
    const [fields, setFields] = useState<Field[]>([])

    const fieldTypes: any = [
        { type: 'Single Choice' },
        { type: 'Multiple Choice' },
        { type: 'Number' },
        { type: 'String' },
    ]

    const [fieldType, setFieldType] = useState({ type: '' })
    const [value, setValue] = useState<string[]>([]);
    const [checked, toggle] = useReducer(checked => !checked, false);

    const saveData = () => {
        {
            const newField: Field = {
                label: field.label,
                placeholder: field.placeholder,
                fieldType: fieldType.type,
                options: value,
                mandatory: checked,
                sectionNr: sectionNr,
            }
            //setField(newField)
            setFields([...fields, field])
            console.log(fields)
            setField({
                label: '',
                placeholder: '',
                fieldType: '',
                options: [],
                mandatory: false,
                sectionNr: '',
            })
            setFieldType({ type: '' })
            setValue([])
            toggle()
        }

    }

    return (
        <div className='new-field'>
            <div className='field-section'>
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
                <Button
                    label="Save Field"
                    onClick={saveData}
                />
            </div>
        </div>
    )
}
