import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/ContextProvider'
import { useFormRegister } from '../hooks/useFormRegister'
import { userService } from '../services/userService'

export const Login: React.FC = () => {
    const { fields, register } = useFormRegister({
        username: '',
        password: ''
    })
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)

    const navigate = useNavigate()

    const login = async (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => {
        ev.preventDefault()
        try {
            if (!fields.username || !fields.password) return handleError('Something missing')
            const user = type === 'login' ? await userService.login(fields) :
                type === 'signup' ? await userService.signup(fields) : null
            if (user) {
                setLoggedInUser(user)
                navigate('/')
            }
        } catch (err) {
            return handleError('Username or password incorrect')
        }
    }

    const logout = async (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault()
        if (loggedInUser)
            await userService.logout(loggedInUser.id)
        setLoggedInUser(null)
    }

    const [error, setError] = useState('')
    const handleError = (err: string) => {
        setError(err)
        setTimeout(() => { setError('') }, 2000)
    }
    return (
        <section className="login-page container">
            <form >
                {!loggedInUser ?
                    <>
                        <label htmlFor="username">User Name</label>
                        <input type="text" {...register('username')} />
                        <label htmlFor="password">Password</label>
                        <input type="text" {...register('password')} />
                        <div className="btns">
                            <button className="login-btn" onClick={(ev) => login(ev, 'login')}>Login</button>
                            <button className="signup-btn" onClick={(ev) => login(ev, 'signup')}>Signup</button>
                        </div>
                        <div className="error"><p>{error}</p></div>
                    </> :
                    <>
                        <p className="user-name">Hello {loggedInUser.username}</p>
                        <button onClick={(ev) => logout(ev)} className="logout-btn">Logout</button>
                    </>
                }
            </form>
        </section>
    )
}
