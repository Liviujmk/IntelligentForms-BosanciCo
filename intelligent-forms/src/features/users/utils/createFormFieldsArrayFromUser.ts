import { User } from "../types/user.types";

export const createFormFieldsArrayFromUser = (user: User) => {
        return [
                ['name', user.name],
                ['email', user.email],
                ['password', user.password],
                ['address', user.address],
                ['userType', user.userType],
                ['fiscalCode', user.fiscalCode],
                ['subscriptionPlan', user.subscriptionPlan],
        ]
}