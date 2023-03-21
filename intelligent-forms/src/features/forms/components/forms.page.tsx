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
    const toastBC = useRef<Toast>(null);
    const [formsByUserId, setFormsByUserId] = useState<Form[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [activeLayout, setActiveLayout] = useState<string>('');
    const [activeForm, setActiveForm] = useState<any>({
        title: '',
        fillFormUrl: ''
    });

    const { isLoading, data: forms, mutate: mutateForms } = useSWR<Form[]>('/forms', getAllForms);

    const clear = (submit: boolean, formId?: string) => {
        // @ts-ignore
        toastBC.current.clear();
        // @ts-ignore
        submit && deleteFormMutation(formId);
    };

    const deleteFormMutation = async (formId: string) => {
        await deleteForm(formId);
        mutateForms();
        // @ts-ignore
        toast.current.show({ severity: 'success', summary: 'Form deleted', detail: 'Form deleted along with its submsissions' });
    };

    const confirm = async (formId: string) => {
        toastBC.current?.show({
            severity: 'warn',
            sticky: true,
            className: 'border-none',
            content: (
                <div className="flex flex-column align-items-center" style={{ flex: '1' }}>
                    <div className="text-center">
                        <i className="pi pi-exclamation-triangle" style={{ fontSize: '3rem' }}></i>
                        <div className="font-bold text-xl my-3">Are you sure?</div>
                        <p>This action will also delete all submissions from this form</p>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={(e) => clear(true, formId)} type="button" label="Confirm" className="p-button-danger w-6rem" />
                        <Button onClick={(e) => clear(false)} type="button" label="Cancel" className="p-button-warning w-6rem" />
                    </div>
                </div>
            )
        });
    };

    return (
        <AuthenticatedLayout>
            <div className='formsHeader'>
                <h1>Forms</h1>
                <Link to='create'>
                    <Button label="Create new form" icon="pi pi-plus" className='p-button-primary' />
                </Link>
            </div>
            <div className="card table">
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
                                                <Toast ref={toastBC} />
                                                <Button tooltip='Delete form' icon="pi pi-trash" className='p-button-danger'
                                                    // @ts-ignore
                                                    onClick={() => confirm(rowData.id)}
                                                />
                                                <Link to={`${rowData.id}/submissions`}>
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