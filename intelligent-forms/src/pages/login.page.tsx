//create login component is tsx file

import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import useAuth from '../features/auth/hooks/useAuth';
import AuthContext from '../features/auth/AuthProvider';
import { loginUser } from '../features/auth/api';
import { UserLite } from '../features/users/types/user.types';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import { AuthenticatedLayout } from '../layouts/authenticated-layout/Authenticated.layout';

export const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { auth, setAuth }: any = useContext(AuthContext);
    const from = location.state?.from?.pathname || '/dashboard';
    //check constantly if localStorage has access_token
    useEffect(() => {
        if (Cookies.get("access_token")) {
            navigate(from, { replace: true });
        }
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const data: UserLite = {
            email: email,
            password: password
        }

        loginUser(data)
            .then((data) => {
                if (data.access_token) {
                    localStorage.setItem('access_token', data.access_token);
                    Cookies.set('access_token', data.access_token);
                    setAuth(data);
                    navigate(from, { replace: true });
                }
            })
    }

    return (
        <div className='login-form'>
            <div className='login-header'>
                <p className='title'>Welcome Back</p>
                <p className='description'>Please enter your details</p>
            </div>
            <div className="p-field">
                <span className="p-float-label">
                    <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label htmlFor="email">Email</label>
                </span>
            </div>
            <div className="p-field">
                <span className="p-float-label">
                    <Password className='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <label htmlFor="password">Password</label>
                </span>
            </div>
            <Button className='submit-button' label="Login" onClick={handleSubmit} />
            <p>Don't have an account? <span><Link to={'/signup'}>Register!</Link></span></p>
        </div>
    );
};
