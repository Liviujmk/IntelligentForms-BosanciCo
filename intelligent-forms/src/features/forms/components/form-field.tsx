import { useEffect, useReducer, useState } from 'react'
import { Form, Field, Section, ChoiceField } from '../types/form.types'
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Chips, ChipsChangeEvent } from 'primereact/chips';
import * as yup from 'yup';


interface Props {
    sectionNr: number,
    fieldsArray: Field[] | ChoiceField[],
    setFields: React.Dispatch<React.SetStateAction<Field[] | ChoiceField[]>>
}

const schema = yup.object().shape({
    label: yup.string()
        .min(2, 'Label is Too Short!')
        .max(70, 'Label is Too Long!')
        .required(),
    placeholder: yup.string()
        .min(2, ' Placeholder is Too Short!')
        .max(70, 'Placeholder is Too Long!')
        .required(),
    fieldType: yup.string()
        .min(2, 'FieldType is Too Short!')
        .max(70, 'FieldType Too Long!').
        required(),
    keyword: yup.string()
        .min(2, 'Keyword is Too Short!')
        .max(70, 'Keyword is Too Long!')
        .required(),
    mandatory: yup.boolean(),
    sectionNr: yup.number().required(),
})


export const NewField = ({ sectionNr, fieldsArray, setFields }: Props) => {

    const [field, setField] = useState<Field | ChoiceField>({
        label: '',
        placeholder: '',
        fieldType: '',
        options: [
            {
                name: '',
            }
        ],
        keyword: '',
        mandatory: false,
        sectionNr: sectionNr,
    })

    const fieldTypes: any = [
        { type: 'Text' },
        { type: 'Number' },
        { type: 'Date' },
        { type: 'Decimal' },
        { type: 'Single-Choice' },
        { type: 'Multiple-Choice' },
    ]

    const [fieldType, setFieldType] = useState<any>({ type: '' })
    const [choices, setChoices] = useState<any[]>([]);
    const [checked, toggle] = useReducer(checked => !checked, false);

    const addField = () => {
        const newField: any = {
            label: field.label,
            placeholder: field.placeholder,
            fieldType: fieldType?.type,
            keyword: field.keyword,
            options: choices,
            mandatory: checked,
            sectionNr: sectionNr,
        }
        setFields([...fieldsArray, newField])
    }

    const resetData = () => {
        setField({
            label: '',
            placeholder: '',
            fieldType: '',
            keyword: '',
            options: [],
            mandatory: false,
            sectionNr: sectionNr,
        })
        setFieldType({ type: '' })
        setChoices([])
        toggle()
    }

    const saveData = () => {
        const data = {
            label: field.label,
            placeholder: field.placeholder,
            fieldType: fieldType?.type,
            keyword: field.keyword,
            options: choices,
            mandatory: checked,
            sectionNr: sectionNr,
        }
        schema.validate(data)
            .then(() => {
                console.log('data is valid')
                addField()
                resetData()
            })
            .catch((err) => {
                console.log(err)
                alert(err + '  Field is not valid')
            })

    }


    return (
        <div className='new-field'>
            <div className='field-section'>
                <InputText
                    type="text"
                    placeholder="Label"
                    value={field.label}
                    onChange={(e) => setField({ ...field, label: e.target.value })}
                    validateOnly={true}
                />
                <InputText
                    type="text"
                    placeholder="Placeholder keyword"
                    value={field.placeholder}
                    onChange={(e) => setField({ ...field, placeholder: e.target.value })}
                />
                <InputText
                    type="text"
                    placeholder="Document keyword"
                    value={field.keyword}
                    onChange={(e) => setField({ ...field, keyword: e.target.value })}
                />
                <Dropdown
                    value={fieldType}
                    onChange={(e) => {
                        setFieldType(
                            {
                                type: e.value.type
                            }
                        )
                        setField({
                            ...field,
                            fieldType: e.value.type
                        })

                    }}
                    options={fieldTypes}
                    optionLabel="type"
                    placeholder="Select a field type"
                />
                <div className='options'>
                    {
                        fieldType.type === 'Single-Choice' || fieldType.type === 'Multiple-Choice' ?
                            (<Chips
                                id='options-chips'
                                required={true}
                                value={
                                    choices.map((choice: any) => {
                                        return choice.name
                                    })
                                }
                                onChange={(e: any) => setChoices(
                                    e.value.map((choice: any) => {
                                        return { name: choice }
                                    })

                                )}
                                separator={','}
                                placeholder='Write your options here ' />)
                            : null
                    }

                </div>

                <div className='mandatory'>
                    <Checkbox
                        onChange={toggle}
                        checked={checked}>
                    </Checkbox>
                    {
                        checked ? ' Mandatory' : ' Mandatory'
                    }
                </div>
                {
                    (fieldType.type === 'Single-Choice' || fieldType.type === 'Multiple-Choice') && (choices.length === 0 ) ?
                        <Button
                            label="Add Field"
                            onClick={() => alert('Add at least one option and then click Add Field')}
                        /> : 
                        <Button
                            label="Add Field"
                            onClick={saveData}
                        />
                }
            </div>
            <div className='added-fields'>

                <Chips
                    removable={false}
                    value={fieldsArray.map((field: any) => {
                        return field.label
                    })}
                    placeholder='Here are the fields you added so far'
                    separator={','}
                    readOnly={true}
                />
            </div>
        </div>
    )
}
