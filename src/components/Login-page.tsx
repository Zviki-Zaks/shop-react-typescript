import React, { useState } from 'react'
import { useFormRegister } from '../hooks/useFormRegister'
import { userService } from '../services/userService'

export const Login = () => {
    const { fields, register } = useFormRegister({
        username: '',
        password: ''
    })
    const login = async (type: string) => {
        try {
            if (!fields.username || !fields.password) return handleError('Something missing')
            const user = type === 'login' ? await userService.login(fields) :
                type === 'signup' ? await userService.signup(fields) : null

        } catch (err) {
            console.log(err)
            return handleError('Username or password incorrect')
        }
    }

    const [error, setError] = useState('')
    const handleError = (err: string) => {
        setError(err)
        setTimeout(() => { setError('') }, 2000)
    }
    return (
        <section className="login-page">
            <form onSubmit={(ev) => ev.preventDefault()}>
                <input type="text" {...register('username')} />
                <input type="text" {...register('password')} />
                <button onClick={() => login('login')}>Login</button>
                <button onClick={() => login('signup')}>Signup</button>
            </form>
            <div className="error"><p>{error}</p></div>
        </section>
    )
}
