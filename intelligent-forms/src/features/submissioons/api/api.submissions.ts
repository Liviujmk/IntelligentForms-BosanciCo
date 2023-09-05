import { API_PATH_PROD, API_PATH_LOCAL } from "../../../config/api";
import { FORMS_PATH } from "../../forms/api/api.forms";
import { Submission } from "../types/submission.types";

const SUBMISSIONS_PATH = "submissions";

export const getAllSubmissions = async (formID: any) => {
    try {
        const response = await fetch(`${API_PATH_PROD}${FORMS_PATH}/${formID}/${SUBMISSIONS_PATH}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem('access_token')!
            },
            credentials: "include",
        });
        return response.json();
    } catch (error) {
        return {error : error}
    }
}

export const getSubmission = async (submissionID: string) => {
    try {
        const response = await fetch(`${API_PATH_PROD}${SUBMISSIONS_PATH}/${submissionID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem('access_token')!
            },
            credentials: "include",
        });
        return response.json();
    } catch (error) {
        return {error : error}
    }
}

export const deleteSubmission = async (submissionID: string) => {
    try {
        const response = await fetch(`${API_PATH_PROD}${SUBMISSIONS_PATH}/${submissionID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem('access_token')!
            },
            credentials: "include",
        });
        return response.json();
    } catch (error) {
        return {error : error}
    }
}



