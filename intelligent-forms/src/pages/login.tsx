//create login component is tsx file

import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import useAuth from '../features/auth/hooks/useAuth';
import AuthContext from '../features/auth/AuthProvider';
import { loginUser } from '../features/auth/api';
import { UserLite } from '../features/users/types/user.types';

import { AuthenticatedLayout } from '../layouts/authenticated-layout/Authenticated.layout';

export const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { auth, setAuth }: any = useContext(AuthContext);
    const from = location.state?.from?.pathname || '/dashboard';

    //check constantly if localStorage has access_token
    useEffect(() => {
        if (localStorage.getItem('access_token')) {
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
                    setAuth(data);
                    navigate(from, { replace: true });
                }
            })
    }

    return (

        <AuthenticatedLayout>
            <div className="login">
                <div className="login__container">
                    <div className="login__container__header">
                        <h1>Login</h1>
                    </div>
                    <div className="login__container__body">
                        <form onSubmit={handleSubmit}>
                            <div className="login__container__body__input">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="login__container__body__input">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="login__container__body__input">
                                <button type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="login__container__footer">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>

    )
}

