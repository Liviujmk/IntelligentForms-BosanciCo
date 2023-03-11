import { z as zod } from 'zod'

export const USERS_ENDPOINT = 'users'

export const USER_FORM_SCHEMA = zod.object({
    name: zod
        .string({
            required_error: 'required field',
        })
        .min(1),
    email: zod
        .string({
            required_error: 'required field',
        })
        .min(1),
    password: zod
        .string({
            required_error: 'required field',
        })
        .min(1),
    address: zod
        .string({
            required_error: 'required field',
        })
        .min(1),
    userType: zod
        .string({
            required_error: 'required field',
        })
        .min(1),
    fiscalCode: zod
        .string({
            required_error: 'required field',
        })
        .min(1),
    subscriptionPlan: zod
        .string({
            required_error: 'required field',
        })
        .min(1),

})

export const USER_FIELDS_DEFAULT_VALUES = {
    name: '',
    email: '',
    password: '',
    address: '',
    userType: '',
    fiscalCode: '',
    subscriptionPlan: 'free',
} as const