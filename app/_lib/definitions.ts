import {z} from "zod"

export const SignupFormSchema = z.object({
    name: z.string().min(2, {message: 'Name must be at least 2 characters long.'}).max(255, {message: 'Name must be at most 255 characters long.'}).trim(),
    surname: z.string().min(2, {message: 'Surname must be at least 2 characters long.'}).max(255, {message: 'Surname must be at most 255 characters long.'}).trim(),
    email: z.string().email({message: 'Please enter a valid email address.'}).trim(),
    password: z.string().min(6, {message: 'Password must be at least 6 characters long.'}).regex(/[0-9]/, { message: 'Contain at least one number.' }).trim(),
    confirmPassword: z.string().min(6, {message: 'Password must be at least 6 characters long.'}).regex(/[0-9]/, { message: 'Contain at least one number.' }).trim()
})
.refine(data => data.password === data.confirmPassword, {message: "Passwords do not match.", path: ['confirmPassword']})

export const SigninFormSchema = z.object({
    email: z.string().email({message: 'Please enter a valid email address.'}).trim(),
    password: z.string().min(6, {message: 'Password must be at least 6 characters long.'}).regex(/[0-9]/, { message: 'Contain at least one number.' }).trim()
})

export type SigninFormState = | {
    errors?: {
        email?: string[] | undefined;
        password?: string[] | undefined;
    };
    message?: string;
} | undefined

export type SignupFormState = | {
    errors?: {
        name?: string[] | undefined;
        surname?: string[] | undefined;
        email?: string[] | undefined;
        password?: string[] | undefined;
        confirmPassword?: string[] | undefined;
    };
    message?: string;
} | undefined;