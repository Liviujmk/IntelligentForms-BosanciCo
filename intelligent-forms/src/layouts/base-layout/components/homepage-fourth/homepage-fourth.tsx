import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import './homepage-fourth.css'
import { PrimeIcons } from 'primereact/api';
import scanqr from '../../../../assets/scanqr.png'

export const FourthFrame = () => {
  return (
    <div className="fourth-frame">
      <div className="fourth-frame-text">
        <p className="fourth-frame-title">Share Forms using QR</p>
        <p className="fourth-frame-subtitle">Every form is accessed by accessing URL or instantaneously by scanning QR Code.</p>
      </div>
      <div className="fourth-frame-icon">
        <img alt="scanqr" src={scanqr} height="300" className="scanqr"></img>
      </div> 
    </div>
  )
}