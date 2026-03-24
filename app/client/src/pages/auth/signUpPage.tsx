import { z } from 'zod/v3'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/config/supabase'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Field, FieldLabel, FieldError } from '@/components/ui/forms/field'
import { Input } from '@/components/ui/forms/input'
import { Button } from '@/components/ui/Buttons/button'

const signUpSchema = z.object({
    full_name: z.string().min(1, 'Full name is required'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'] // show the error on the confirmPassword field
})

type SignUpValues = z.infer<typeof signUpSchema>

const SignUpPage = () => {
    const [serverError, setServerError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema)
    })

    const onSubmit = async (values: SignUpValues) => {
        setServerError(null)

        const { error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options: {
                data: { full_name: values.full_name } // this gets passed to your trigger
            }
        })

        if (error) {
            setServerError(error.message)
            return
        }

        setSuccess(true) // show confirmation message instead of redirecting
    }

    if (success) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center flex flex-col gap-4'>
                    <h2>Check your email</h2>
                    <p>We sent a confirmation link to your email. Click it to activate your account.</p>
                    <Link to='/login' className='underline text-sm'>Back to login</Link>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen flex items-center justify-center px-6'>
            <div className='w-full max-w-125 flex flex-col gap-8'>

                <div className='text-center'>
                    <h2>Create an account</h2>
                    <p className='text-neutral-500 text-sm mt-2'>Join thousands finding their perfect property</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>

                    <Field>
                        <FieldLabel>Full Name</FieldLabel>
                        <Input placeholder='John Doe' {...register('full_name')} />
                        <FieldError errors={[errors.full_name]} />
                    </Field>

                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input type='email' placeholder='john@example.com' {...register('email')} />
                        <FieldError errors={[errors.email]} />
                    </Field>

                    <Field>
                        <FieldLabel>Password</FieldLabel>
                        <Input type='password' placeholder='Min. 8 characters' {...register('password')} />
                        <FieldError errors={[errors.password]} />
                    </Field>

                    <Field>
                        <FieldLabel>Confirm Password</FieldLabel>
                        <Input type='password' placeholder='Repeat your password' {...register('confirmPassword')} />
                        <FieldError errors={[errors.confirmPassword]} />
                    </Field>

                    {/* Server side errors from Supabase */}
                    {serverError && (
                        <p className='text-red-500 text-sm'>{serverError}</p>
                    )}

                    <Button type='submit' variant='default' disabled={isSubmitting}>
                        {isSubmitting ? 'Creating account...' : 'Sign Up'}
                    </Button>

                </form>

                <p className='text-center text-sm text-neutral-500'>
                    Already have an account? <Link to='/login' className='underline'>Log in</Link>
                </p>

            </div>
        </div>
    )
}

export default SignUpPage