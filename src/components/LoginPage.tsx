import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import { useFormRegister } from '../hooks/useFormRegister'
import { userService } from '../services/userService'

export const Login: React.FC = () => {
    const { fields, register } = useFormRegister({
        username: '',
        password: ''
    })
    const navigate = useNavigate()
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)

    useEffect(() => {
        if (loggedInUser) {
            navigate('/')
        }

    }, [loggedInUser])


    const login = async (type: string) => {
        try {
            if (!fields.username || !fields.password) return handleError('Something missing')
            const user = type === 'login' ? await userService.login(fields) :
                type === 'signup' ? await userService.signup(fields) : null
            if (user) setLoggedInUser(user)
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
        <section className="login-page container">
            <form onSubmit={(ev) => ev.preventDefault()}>
                <label htmlFor="username">User Name</label>
                <input type="text" {...register('username')} />
                <label htmlFor="password">Password</label>
                <input type="text" {...register('password')} />
                <div className="btns">
                    <button className="login-btn" onClick={() => login('login')}>Login</button>
                    <button className="signup-btn" onClick={() => login('signup')}>Signup</button>
                </div>
                <div className="error"><p>{error}</p></div>
            </form>
        </section>
    )
}
