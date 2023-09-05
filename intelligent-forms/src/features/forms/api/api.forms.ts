import { API_PATH_PROD, API_PATH_LOCAL } from "../../../config/api";
import { Form } from "../types/form.types";

export const FORMS_PATH = "forms";

export const createForm = async (form: Form) => {
    try {
        const response = await fetch(`${API_PATH_PROD}${FORMS_PATH}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-authorization": localStorage.getItem('access_token')!
            },
            credentials: "include",
            body: JSON.stringify(form),
        });
        return response.json();
    } catch (error) {
        return {error : error}
    }
};

export const getAllForms = async () => {
    try {
        const response = await fetch(`${API_PATH_PROD}${FORMS_PATH}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-authorization": localStorage.getItem('access_token')!
            },
            credentials: "same-origin",
        });
        return response.json();
    } catch (error) {
        return {error : error}
    }
};

export const getForm = async (formId: string) => {
    try {
        const response = await fetch(`${API_PATH_PROD}fill/forms/${formId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-authorization": localStorage.getItem('access_token')!
            }
        });
        return response.json();
    } catch (error) {
        return {error : error}
    }
};

export const updateForm = async (form: Form, formId: string) => {
    try {
        const response = await fetch(`${API_PATH_PROD}${FORMS_PATH}/${formId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-authorization": localStorage.getItem('access_token')!
            },
            credentials: "include",
            body: JSON.stringify(form),
        });
        return response.json();
    } catch (error) {
        return {error : error}
    }
}

export const deleteForm = async (formId: string) => {
    try {
        const response = await fetch(`${API_PATH_PROD}${FORMS_PATH}/${formId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-authorization": localStorage.getItem('access_token')!
            },
            credentials: "include",
        });
        return response.json();
    } catch (error) {
        return {error : error}
    }
}