//create login component is tsx file

import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import useAuth from '../features/auth/hooks/useAuth';
import AuthContext from '../features/auth/AuthProvider';
import { createUser, loginUser } from '../features/auth/api';
import { UserLite } from '../features/users/types/user.types';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { User } from '../features/users/types/user.types';
import { toNamespacedPath } from 'path';

export const Signup = () => {
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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [userType, setUserType] = useState('');
    const [fiscalCode, setFiscalCode] = useState('');
    const [subscriptionPlan, setsubscriptionPlan] = useState('');
    const userTypes = [
        { name: 'Individual' },
        { name: 'Company' },
        { name: 'Public Institution' }
    ];

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const data: User = {
            name: name,
            email: email,
            password: password,
            address: address,
            userType: userType,
            fiscalCode: fiscalCode,
            subscriptionPlan: subscriptionPlan,
        }

        createUser(data)
            .then((data) => {
                if (data.access_token) {
                    localStorage.setItem('access_token', data.access_token);
                    Cookies.set('access_token', data.access_token);
                    setAuth(data);
                    navigate(from, { replace: true });
                }
            })
    }
    useEffect(() => {
        setUserType(userType);
    }, [userType]);


    return (
        <div className='login-form' id='signup-form'>
            <div className='login-header'>
                <p className='title'> Get started</p>
                <p className='description'>Create your account now</p>
            </div>
            <div className="p-field-group">
                <span className="p-float-label">
                    <Dropdown inputId="dd-city" value={userType} onChange={(e) => setUserType(e.value)} options={userTypes} optionLabel="name" className="w-full md:w-14rem" />
                    <label htmlFor="dd-city">Select a type</label>
                </span>
                <span className="p-float-label">
                    {
                        userType === 'Individual' ? (<InputText disabled placeholder="Disabled" />) : (<InputText id="fiscalCode" value={fiscalCode} onChange={(e) => setFiscalCode(e.target.value)} />)
                    }
                    <label htmlFor="email">Fiscal Code</label>
                </span>
            </div>
            <div className="p-field">
                <span className="p-float-label">
                    <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <label htmlFor="email">Name</label>
                </span>
            </div>
            <div className="p-field">
                <span className="p-float-label">
                    <InputText id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    <label htmlFor="email">Address</label>
                </span>
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
            <Button className='submit-button' label="Submit" onClick={handleSubmit} />
            <p>Already have an account? <span><Link to={'/login'}>Login!</Link></span></p>
        </div>
    );
};

