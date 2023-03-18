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
import { TabView, TabPanel } from 'primereact/tabview';

interface Props {
    sectionNr: number
}

export const NewSection = ({ sectionNr }: Props) => {

    const [addField, setAddField] = useState<Field[]>([{
        label: '',
        placeholder: '',
        fieldType: '',
        options: [],
        mandatory: false,
        sectionNr: sectionNr,
    }])

    const clearField = () => {
        setAddField([{
            label: '',
            placeholder: '',
            fieldType: '',
            options: [],
            mandatory: false,
            sectionNr: sectionNr,
        }])
    }
    return (
        <div className='section'>
            {
                addField.map(() => {
                    return <NewField sectionNr={sectionNr} />
                })
            }
            <Button
                onClick={
                    () => {
                        setAddField([...addField, <NewField sectionNr={sectionNr} />])
                    }
                }
                label="Add field" />

            <div className='rtf-section'>
                <Editor style={{ height: '180px' }} />
            </div>
            <div>
                <InputText type="text" placeholder="Add the document type" />
            </div>
        </div>
    )
}
