import React from 'react';
import { TabPanelHeaderTemplateOptions } from 'primereact/tabview';
import '../components/fill-form.css'


export const TabHeaderTemplate = (options: TabPanelHeaderTemplateOptions) => {
    return (
        <button type="button" onClick={options.onClick} className='tab-btn'>
            {options.titleElement}
        </button>
    )
};

const editorHeader = () => {
    return (
        <span className="ql-formats">
        </span>
    );
};
export const editorHead = editorHeader();