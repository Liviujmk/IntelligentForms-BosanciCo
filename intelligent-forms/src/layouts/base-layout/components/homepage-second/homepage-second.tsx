import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import './homepage-second.css'
import { PrimeIcons } from 'primereact/api';
import iconscan from '../../../../assets/iconscan.png'

export const SecondFrame = () => {
  return (
    <div className="second-frame">
      <div className="second-frame-text">
        <p className="second-frame-title">Automatic filling forms</p>
        <p className="second-frame-subtitle">Complete your details just by scanning your personal documents(ID, Passport, Vehicle Registration Certificate).</p>
      </div>
      <div className="second-frame-icon">
        <img alt="iconscan" src={iconscan} height="300" className="iconscan"></img>
      </div> 
    </div>
  )
}