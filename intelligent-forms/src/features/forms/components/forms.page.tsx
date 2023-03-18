import { AuthenticatedLayout } from '../../../layouts/authenticated-layout/Authenticated.layout';

import './forms.page.css'

import { useEffect, useState } from 'react';
import { Form } from '../types/form.types';

import { Sidebar } from 'primereact/sidebar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { getAllForms, getForm } from '../api/api.forms';
import { Link } from 'react-router-dom';
import QRCode from "react-qr-code";

export const FormsPage = () => {
    const [formsByUserId, setFormsByUserId] = useState<Form[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [activeForm, setActiveForm] = useState<any>({
        title: '',
        fillFormUrl: ''
    });

    useEffect(() => {
        const fetchFormsByUserId = async () => await getAllForms().then((response) => setFormsByUserId(response))
        fetchFormsByUserId();
    }, []);


    return (
        <AuthenticatedLayout>
            <h1>Forms</h1>
            <div className="card">
                <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen className='qr-dialog'>
                    <h2>Scan qr below and fill the '{activeForm.title}'</h2>
                    <div className='qr-container'>
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={activeForm.fillFormUrl}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                </Sidebar>
                <DataTable value={formsByUserId} tableStyle={{ minWidth: '60rem' }}>
                    <Column field="title" header="Title"></Column>
                    <Column field="dataRetention" header="Data Retention"></Column>
                    <Column field="createdAt" header="Created at"></Column>
                    <Column header="Actions" body={(rowData: Form) => {
                        return (
                            <div>
                                <div className="card table-group flex flex-wrap justify-content-center gap-3">
                                    <Button label="QR" icon="pi pi-qrcode" onClick={() => {
                                        setVisible(true);
                                        setActiveForm({
                                            title: rowData.title,
                                            fillFormUrl: rowData.fillFormUrl
                                        });
                                    }}
                                    />
                                    <Button label="Delete" icon="pi pi-trash" className='p-button-danger' />
                                </div>
                            </div>
                        )
                    }}></Column>
                </DataTable>
            </div>
        </AuthenticatedLayout>
    )
}