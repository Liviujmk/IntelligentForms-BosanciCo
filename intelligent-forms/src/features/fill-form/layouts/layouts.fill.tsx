import React from 'react';
import { TabView, TabPanel, TabPanelHeaderTemplateOptions } from 'primereact/tabview';
import { Button } from 'primereact/button';
import '../components/fill-form.css'


export const TabHeaderTemplate = (options: TabPanelHeaderTemplateOptions) => {
    return (
        <button type="button" onClick={options.onClick} className='tab-btn'>
            {options.titleElement}
        </button>
    )
};