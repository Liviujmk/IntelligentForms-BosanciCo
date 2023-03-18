import React from 'react';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import './homepage-first.css'
import { PrimeIcons } from 'primereact/api';
import iconfiles from '../../../../assets/iconfiles.png'

export const FirstFrame = () => {
  const navigate = useNavigate()
  return (
    <div className="first-frame">
        <div className="first-frame-icon">
          <img alt="iconfiles" src={iconfiles} height="300" className="iconfiles"></img>
        </div>
        <div>
          <p className="first-frame-title">We make FORMS easy.</p>
          <p className="first-frame-subtitle">Are you tired of filling out forms by hand?</p>
          <div className="first-frame-buttons">
            <Button className="first-frame-button-signup" onClick={() => {navigate('/signup');}}>Try it out</Button>
            <Button className="first-frame-button-login" onClick={() => {navigate('/login');}}>Log In</Button>
          </div>    
        </div>
    </div>
  )
}