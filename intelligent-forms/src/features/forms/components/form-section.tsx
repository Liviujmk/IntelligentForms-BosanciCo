import { Form, Field, Section, ChoiceField } from '../types/form.types'
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';
import { NewField } from './form-field';
import * as yup from 'yup';
import { Dropdown } from 'primereact/dropdown';



interface Props {
    sectionNr: number
    fields: Field[] | ChoiceField[],
    setFields: React.Dispatch<React.SetStateAction<Field[] | ChoiceField[]>>
    sections: any,
    setSections: React.Dispatch<React.SetStateAction<any[]>>
}


export const NewSection = ({ sectionNr, fields, setFields, sections, setSections, }: Props) => {
    console.log('sections', sections)
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
                    placeholder='Add your text here...'
                    value={
                        sections.filter((section: { sectionNr: number; }) => section.sectionNr === sectionNr)[0].rtfText
                    }
                    onTextChange={(e: EditorTextChangeEvent) => {
                        setSections(sections.map((section: { sectionNr: number; }) => {
                            if (section.sectionNr === sectionNr) {
                                return { ...section, rtfText: e.textValue }
                            }
                            return section
                        }))

                    }}
                    style={{ height: '250px' }}
                />
            </div>
            <div className='scan-document'>
                <label className="font-bold block mb-2">Scan document type</label>
                <Dropdown value={
                    sections.filter((section: { sectionNr: number; }) => section.sectionNr === sectionNr)[0].documentType
                }
                    options={[
                        'None',
                        'Identity card',
                        'Passport',
                        'Car identity',
                        'Birth certificate',
                    ]}
                    onChange={(e) => {
                        setSections(sections.map((section: { sectionNr: number; }) => {
                            if (section.sectionNr === sectionNr) {
                                return { ...section, documentType: e.value }
                            }
                            return section
                        }))
                    }}
                />

                {/* <InputText
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
                /> */}
            </div>
        </div>
    )
}

