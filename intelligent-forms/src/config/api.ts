// api paths
export const API_PATH_LOCAL = 'http://localhost:3000/';
export const API_PATH_PROD = 'https://intform.azurewebsites.net/'

//start server function to get faster response from server
export async function startServer() {
    const response = await fetch(API_PATH_PROD);
    return response.json();
}
