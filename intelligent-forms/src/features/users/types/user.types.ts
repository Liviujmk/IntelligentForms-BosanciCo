import { USER_FIELDS_DEFAULT_VALUES } from "../constants/user.const"

export interface User {
    id?: string
    name: string
    email: string
    password: string
    address: string
    userType: string
    fiscalCode?: string
    subscriptionPlan: string
}
export interface UserLite {
    email: string
    password: string
}

export type UserFieldName = keyof typeof USER_FIELDS_DEFAULT_VALUES