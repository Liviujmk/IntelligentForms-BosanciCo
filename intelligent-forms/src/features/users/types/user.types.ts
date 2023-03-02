import { USER_FIELDS_DEFAULT_VALUES } from "../constants/user.const"

export interface User {
    id?: string
    name: string
    email: string
    password: string
    adress: string
    fiscalCode?: string
    subscriptionPlan: string
}

export type UserFieldName = keyof typeof USER_FIELDS_DEFAULT_VALUES