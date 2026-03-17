import { z } from 'zod'
import { validationMessages } from '@/modules/users/users.constants'

const { firstName, lastName, email, password, confirmPassword } = validationMessages

export const createUserSchema = z
  .object({
    firstName: z.string().min(1, firstName.required),
    lastName: z.string().min(1, lastName.required),
    email: z.email({ error: email.invalid }),
    password: z
      .string()
      .min(8, password.min)
      .regex(/[A-Z]/, password.uppercase)
      .regex(/[0-9]/, password.number),
    confirmPassword: z.string().min(1, confirmPassword.required),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: confirmPassword.match,
    path: ['confirmPassword'],
  })

export const updateUserSchema = z.object({
  firstName: z.string().min(1, firstName.required),
  lastName: z.string().min(1, lastName.required),
  email: z.email({ error: email.invalid }),
})

export type TCreateUserSchema = z.infer<typeof createUserSchema>
export type TUpdateUserSchema = z.infer<typeof updateUserSchema>
