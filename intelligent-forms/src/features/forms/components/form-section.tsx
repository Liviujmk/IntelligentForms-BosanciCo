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
import { Editor, EditorTextChangeEvent } from 'primereact/editor';
import { NewField } from './form-field';
import { TabView, TabPanel } from 'primereact/tabview';


interface Props {
    sectionNr: number
    fields: Field[] | ChoiceField[],
    setFields: React.Dispatch<React.SetStateAction<Field[] | ChoiceField[]>>
    sections: any,
    setSections: React.Dispatch<React.SetStateAction<any[]>>
}

export const NewSection = ({ sectionNr, fields, setFields, sections, setSections, }: Props) => {

    return (
        <div className='section'>
            <div className='field-section'>
                <label className="font-bold block mb-2">Add field data</label>
                <NewField
                    sectionNr={sectionNr}
                    fieldsArray={fields}
                    setFields={setFields}
                />
            </div>
            <div className='rtf-section'>
                <Editor
                    placeholder='Add RTF text'
                    value={
                        sections.filter((section: { sectionNr: number; }) => section.sectionNr === sectionNr)[0].rtfText
                    }
                    onTextChange={(e: EditorTextChangeEvent) => {
                        setSections(sections.map((section: { sectionNr: number; }) => {
                            if (section.sectionNr === sectionNr) {
                                return { ...section, rtfText: e.htmlValue }
                            }
                            return section
                        }))

                    }}
                    style={{ height: '250px' }}
                />
            </div>
            <div className='scan-document'>
                <label className="font-bold block mb-2">Scan document type</label>
                <InputText
                    type="text"
                    placeholder=""
                    value={sections.filter((section: { sectionNr: number; }) => section.sectionNr === sectionNr)[0].documentType}
                    onChange={(e) => {
                        setSections(sections.map((section: { sectionNr: number; }) => {
                            if (section.sectionNr === sectionNr) {
                                return { ...section, documentType: e.target.value }
                            }
                            return section
                        }))
                    }
                    }
                />
            </div>
        </div>
    )
}

