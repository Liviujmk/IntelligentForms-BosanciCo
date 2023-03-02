// create interface for the user model

interface User {
    name: string;
    email: string;
    password: string;
    address: string;
    userType: string;
    subscriptionPlan: string;
    fiscalCode?: string;
    access_token: string;
}



export { User };