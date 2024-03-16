import React, { useState } from 'react'
import '../styles/AuthPage.css';
import { Link , useNavigate} from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faLock} from '@fortawesome/free-solid-svg-icons'

export const RegisterPage = () => {
    const [form, setForm] = useState({
        email:'',
        password:'',
        username:''
    })
    const [registrationSuccess, setRegistrationSuccess] = useState(false)
    const {loading , request ,error} = useHttp()
    const navigate = useNavigate()
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }
    const registerHandler = async () => {
        try{
            await request('http://localhost:5000/api/auth/register', 'POST', { ...form });
            if(!error){
                setRegistrationSuccess(true)
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (e) {}
    }
    const hasContentClass = form.email ? 'has-content' : '';
    const hasContentClass2 = form.password ? 'has-content' : '';
    const hasContentClass3 = form.username? 'has-content' : '';
    return (
        <div>
            <section className='auth-section'>
                <div className="form-box">
                    <div className="form-value">
                        <form action="">
                            <h2>Register</h2>
                            <div className={`inputbox ${hasContentClass3}${error ? 'error' : ''}`}>
                                <i><FontAwesomeIcon icon={faUser} /></i>
                                <input
                                    id="username"
                                    type="text"
                                    name='username'
                                    onChange={changeHandler}
                                    required
                                />
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className={`inputbox ${hasContentClass}${error ? 'error' : ''}`}>
                                <i><FontAwesomeIcon icon={faEnvelope}/></i>
                                <input
                                    id="email"
                                    type="email"
                                    name='email'
                                    autoComplete='email'
                                    onChange={changeHandler}
                                    required
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className={`inputbox ${hasContentClass2}${error ? 'error' : ''}`}>
                                <i><FontAwesomeIcon icon={faLock}/></i>
                                <input
                                    id="password"
                                    type="password"
                                    name='password'
                                    onChange={changeHandler}
                                    required
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                            {error && <div className="error-message">{error}</div>}
                            {registrationSuccess && (<div className="success-message">Success registration</div>)}
                            <button
                            onClick={registerHandler}
                            disabled={loading}
                            >Register</button>
                            <div className="register">
                                <p>
                                    Already have an account?{' '}
                                    <Link to="/login">Login</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}