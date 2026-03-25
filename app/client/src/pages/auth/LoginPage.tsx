import { z } from 'zod/v3'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/config/supabase'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Field, FieldLabel, FieldError } from '@/components/ui/forms/field'
import { Input } from '@/components/ui/forms/input'
import { Button } from '@/components/ui/Buttons/button'

const loginSchema = z.object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(1, 'Password is required'),
})

type LoginValues = z.infer<typeof loginSchema>

const LoginPage = () => {
    const navigate = useNavigate()
    const [serverError, setServerError] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (values: LoginValues) => {
        setServerError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        })

        if (error) {
            setServerError('Invalid email or password')
            return
        }

        navigate('/')
    }

    return (
        <div className='min-h-screen flex items-center justify-center px-6'>
            <div className='w-full max-w-125 flex flex-col gap-8'>

                <div className='text-center'>
                    <h2>Welcome back</h2>
                    <p className='text-neutral-500 text-sm mt-2'>Log in to your account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>

                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input type='email' placeholder='john@example.com' {...register('email')} />
                        <FieldError errors={[errors.email]} />
                    </Field>

                    <Field>
                        <FieldLabel>Password</FieldLabel>
                        <Input type='password' placeholder='Your password' {...register('password')} />
                        <FieldError errors={[errors.password]} />
                    </Field>

                    {serverError && (
                        <p className='text-red-500 text-sm'>{serverError}</p>
                    )}

                    <Button type='submit' variant='default' disabled={isSubmitting}>
                        {isSubmitting ? 'Logging in...' : 'Log In'}
                    </Button>

                </form>

                <p className='text-center text-sm text-neutral-500'>
                    Don't have an account? <Link to='/signup' className='underline'>Sign up</Link>
                </p>

            </div>
        </div>
    )
}

export default LoginPage