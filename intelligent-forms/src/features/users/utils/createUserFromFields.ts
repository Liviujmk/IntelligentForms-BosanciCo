import { User } from "../types/user.types";

export const createUserFromFields = (userFields: User, userID?: string): User => {
    return {
        ...(userID && { id: userID }),
        name: userFields.name,
        email: userFields.email,
        password: userFields.password,
        adress: userFields.adress,
        userType: userFields.userType,
        fiscalCode: userFields.fiscalCode,
        subscriptionPlan: userFields.subscriptionPlan,
    }
}