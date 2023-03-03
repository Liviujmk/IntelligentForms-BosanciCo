import { User } from "../types/user.types";

export const createFormFieldsArrayFromUser = (user: User) => {
    return [
        ['name', user.name],
        ['email', user.email],
        ['password', user.password],
        ['adress', user.adress],
        //['userType', user.?userType],
        ['fiscalCode', user.fiscalCode],
        ['subscriptionPlan', user.subscriptionPlan],
    ]
}