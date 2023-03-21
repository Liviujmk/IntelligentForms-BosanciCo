import { AuthenticatedLayout } from '../../../layouts/authenticated-layout/Authenticated.layout';

import './forms.page.css'

import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr'
import { Form } from '../types/form.types';
import { useToast } from '../../../common/hooks/useToast';

import { Sidebar } from 'primereact/sidebar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { getAllForms, getForm, deleteForm } from '../api/api.forms';
import { Link } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { QRLayout, LinkLayout } from '../layouts/sidebar-layouts';

export const FormsPage = () => {
    const toast = useRef<Toast>(null);
    const [formsByUserId, setFormsByUserId] = useState<Form[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [activeLayout, setActiveLayout] = useState<string>('');
    const [activeForm, setActiveForm] = useState<any>({
        title: '',
        fillFormUrl: ''
    });

    const { isLoading, data: forms, mutate: mutateForms } = useSWR<Form[]>('/forms', getAllForms);

    const deleteFormMutation = async (formId: string) => {
        try {
            await deleteForm(formId);
            mutateForms();
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Form deleted successfully' });
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error deleting form' });
        }
    }

    return (
        <AuthenticatedLayout>
            <h1>Forms</h1>
            <div className="card">
                <Sidebar visible={visible} onHide={() => {
                    setVisible(false);
                    setActiveLayout('');
                }} fullScreen className='qr-dialog'>
                    {
                        activeLayout === 'qr' ? <QRLayout activeForm={activeForm} /> : <LinkLayout activeForm={activeForm} />
                    }

                </Sidebar>
                {
                    isLoading ? <div>Loading forms...</div> :
                        <DataTable value={forms} tableStyle={{ minWidth: '60rem' }}>
                            <Column field="title" header="Title"></Column>
                            <Column field="dataRetention" header="Data Retention"></Column>
                            <Column field="createdAt" header="Created at"></Column>
                            <Column className='actions' header="Actions" body={(rowData: Form) => {
                                return (
                                    <div>
                                        <div className="card table-group flex flex-wrap justify-content-center gap-3">
                                            <Button
                                                text
                                                label='Show link'
                                                icon="pi pi-link"
                                                onClick={() => {
                                                    setActiveLayout('link');
                                                    setVisible(true);
                                                    setActiveForm({
                                                        title: rowData.title,
                                                        fillFormUrl: rowData.fillFormUrl
                                                    });
                                                }}
                                            />
                                            <div className='btn-group'>
                                                <Button tooltip="Scan form QR" icon="pi pi-qrcode" onClick={() => {
                                                    setActiveLayout('qr');
                                                    setVisible(true);
                                                    setActiveForm({
                                                        title: rowData.title,
                                                        fillFormUrl: rowData.fillFormUrl
                                                    });
                                                }}
                                                />
                                                <Toast ref={toast} />
                                                <Button tooltip='Delete form' icon="pi pi-trash" className='p-button-danger'
                                                    // @ts-ignore 
                                                    onClick={() => deleteFormMutation(rowData.id)}
                                                />
                                                <Link className='' to={`${rowData.id}/submissions`}>
                                                    <Button tooltip='View submissions' icon="pi pi-eye" className='p-button-success' />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }}></Column>
                        </DataTable>
                }
            </div>
        </AuthenticatedLayout>
    )
}