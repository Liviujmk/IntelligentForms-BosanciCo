import { FileUploadHandlerEvent } from "primereact/fileupload";
import { API_PATH_PROD, API_PATH_LOCAL } from "../../../config/api";
import { Submission, SubmissionData, SubmissionField } from "../../submissioons/types/submission.types";

export const analyzeIdentityCard = async (e: FileUploadHandlerEvent) => {
    try {
        const file = e.files[0];
        if (!file) {
            console.log('No file selected. Please select a file and try again.');
            return
        }
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${API_PATH_PROD}analyze/identity`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log(data);
        return data
    } catch (error) {
        console.log("File upload failed. Please try again.");
    }
};

export const analyzePassport= async (e: FileUploadHandlerEvent) => {
    try {
        const file = e.files[0];
        if (!file) {
            console.log('No file selected. Please select a file and try again.');
            return
        }
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${API_PATH_PROD}analyze/passport`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log(data);
        return data
    } catch (error) {
        console.log("File upload failed. Please try again.");
    }
};

export const analyzeCarIdentity= async (e: FileUploadHandlerEvent) => {
    try {
        const file = e.files[0];
        if (!file) {
            console.log('No file selected. Please select a file and try again.');
            return
        }
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${API_PATH_PROD}analyze/caridentity`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log(data);
        return data
    } catch (error) {
        console.log("File upload failed. Please try again.");
    }
};

export const analyzeBirthCertificate= async (e: FileUploadHandlerEvent) => {
    try {
        const file = e.files[0];
        if (!file) {
            console.log('No file selected. Please select a file and try again.');
            return
        }
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${API_PATH_PROD}analyze/birthcertificate`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log(data);
        return data
    } catch (error) {
        console.log("File upload failed. Please try again.");
    }
};

export const createSubmission = async (submission: Submission) => {
    try {
        const response = await fetch(`${API_PATH_PROD}client/submissions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submission),
        });
        const data = await response.json();
        console.log(data);
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
};



