import { z } from 'zod'

export const signupBody = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
})

export const signInBody = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
})