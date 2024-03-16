import React, { useContext, useState} from 'react'
import '../styles/AuthPage.css'
import { Link } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook'
import {AuthContext} from '../contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope,faLock} from '@fortawesome/free-solid-svg-icons'

export const AuthPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const auth = useContext(AuthContext)
    const {loading , request , error} = useHttp()
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }
    const loginHandler = async () => {
        try{
            const data = await request('http://localhost:5000/api/auth/login', 'POST', { ...form });
            auth.login(data.token, data.userId)
            auth.userId(data.userId)
        } catch (e) {}
    }
    const hasContentClass = form.email ? 'has-content' : ''
    const hasContentClass2 = form.password ? 'has-content' : ''

    return (
        <div>
            <section className='auth-section'>
                <div className="form-box">
                    <div className="form-value">
                        <form action="">
                            <h2>Login</h2>
                            <div className={`inputbox ${hasContentClass}${error ? 'error' : ''}`}>
                            <i><FontAwesomeIcon icon={faEnvelope}/></i>
                                <input
                                id='email' 
                                type="email" 
                                name='email' 
                                autoComplete="email"
                                onChange={changeHandler}
                                required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className={`inputbox ${hasContentClass2}${error ? 'error' : ''}`}>
                                <i><FontAwesomeIcon icon={faLock}/></i>
                                <input 
                                id='password' 
                                type="password"
                                name='password' 
                                onChange={changeHandler} 
                                required />
                                <label htmlFor="password">Password</label>
                            </div>
                            {error && <div className="error-message">{error}</div>}
                            <div className="forget">
                            <input type="checkbox" id="rememberMe" />Remember Me
                            <a href="*">Forget Password</a>
                            </div>
                            <button 
                                onClick={loginHandler}
                                disabled={loading}
                            >Log In</button>
                            <div className="register">
                                <p>Don't have account <Link to="/register">Register</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}