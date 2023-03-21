import { AuthenticatedLayout } from "../../../layouts/authenticated-layout/Authenticated.layout";

import { useEffect, useRef, useState } from "react";
import useSWR from 'swr'
import { Submission, SubmissionData, SubmissionField } from "../types/submission.types";
import { useParams } from "react-router-dom";

import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { getAllSubmissions } from "../api/api.submissions";
import { getForm } from "../../forms/api/api.forms";
import { Toast } from "primereact/toast";
import { Column, ColumnFilterClearTemplateOptions, ColumnFilterElementTemplateOptions } from "primereact/column";
import { Form } from "../../forms/types/form.types";
import { Button } from "primereact/button";
import { savePDF } from '@progress/kendo-react-pdf';
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator  } from "primereact/api";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";


export const SubmissionsPage = () => {
    const toast = useRef<Toast>(null);
    const { formId } = useParams<{ formId: string }>();
    const { data: form } = useSWR<Form>(`/forms/${formId}`, () => getForm(formId as string));
    const { isLoading, data: submissions, mutate: mutateSubmissions } = useSWR<Submission[]>(`/forms/${formId}/submissions`, 
        () => getAllSubmissions(formId)
    );

    const [fields, setFields] = useState<string[]>([]);
    const [submissionDataArray, setSubmissionDataArray] = useState<any[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta | null>(null);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    
    // contentArea is the div that will be exported as PDF
    const contentArea = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (submissions!== undefined && submissions.length > 0) {
            setFields(
                submissions[0].data.fields.map((field: SubmissionField) => field.label)
            )
            setSubmissionDataArray(
                [...submissions].map((submission: Submission) => {
                    const submissionData: SubmissionData = submission.data;
                    const submissionDataObject: any = {};
                    submissionData.fields.forEach((field: SubmissionField) => {
                        // @ts-ignore
                        if(typeof field.value === 'object' && !field.value.length) {
                            // @ts-ignore
                            submissionDataObject[field.label] = field.value.name
                        }
                        // @ts-ignore
                        else if(typeof field.value === 'object' && field.value.length) {
                            // @ts-ignore
                            submissionDataObject[field.label] = field.value.map((file: any) => file.name).toString()
                        }
                        else submissionDataObject[field.label] = field.value;
                    }
                    );
                    submissionDataObject.timestamp = new Date(submission.date)
                    submissionDataObject.rtfText = submissionData.rtfText.replace(/<[^>]+>/g, '');
                    return submissionDataObject;
                })
            )
        }
    }, [submissions]);

    useEffect(() => {
        initFilters();
    }, []);

    const exportPDF = (rtfText: string) => {
        // @ts-ignore
        contentArea.current.innerHTML = rtfText;
        // @ts-ignore
        // contentArea.current.style.display = 'none';
        console.log(contentArea)
        // @ts-ignore
        savePDF(contentArea.current, { paperSize: 'A4' });
        // @ts-ignore
        contentArea.current.innerHTML = '';
    }

    const formatDate = (value: Date) => {
        return value.toLocaleDateString('en-UK', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        });
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const filterClearTemplate = (options: ColumnFilterClearTemplateOptions) => {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} severity="secondary"></Button>;
    };

    const dateBodyTemplate = (rowData: any) => {
        return formatDate(rowData.timestamp);
    };

    const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <Calendar value={options.value} onChange={(e: CalendarChangeEvent) => options.filterCallback(e.value, options.index)} dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" mask="99/99/9999" />;
    };

    const header = renderHeader();

    return (
        <AuthenticatedLayout>
            <h1>Submissions from {form?.title}</h1>
            <div className="card table">
            {
                isLoading ? <div>Loading...</div> : (
                    // @ts-ignore
                    <DataTable filters={filters}  header={header} value={submissionDataArray} tableStyle={{ minWidth: '60rem' }} paginator rows={2} rowsPerPageOptions={[2, 4, 8, 16]}>
                        {
                            // add timestamp column
                            <Column filterField="date" dataType="date" filter filterElement={dateFilterTemplate} header="Timestamp" 
                                body={dateBodyTemplate}
                            />    
                        }
                        {
                            //only 5 columns
                            fields.slice(0,5).map((field: string) => (
                                <Column sortable key={field} header={field} field={field}/>
                            ))
                        }
                        {
                            // add actions column
                            <Column key="actions" header="Actions" body={(rowData: any) => (
                                <>
                                    <Button icon="pi pi-file-pdf" tooltip="Export as PDF"
                                        onClick={() => exportPDF(rowData.rtfText)}
                                    />
                                </>
                            )} />
                        }
                    </DataTable>
                )
                        
            }
            <div className="card" ref={contentArea}></div>
            </div>

        </AuthenticatedLayout>
    );
};