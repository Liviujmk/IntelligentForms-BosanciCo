// create interface for the user model

interface User {
    name: string;
    email: string;
    password: string;
    address: string;
    userType: string;
    subscriptionPlan: string;
}

interface CompanyUser extends User {
    fiscalCode: string;
}

export { User, CompanyUser };