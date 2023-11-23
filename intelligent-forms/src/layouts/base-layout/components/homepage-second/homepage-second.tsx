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
        <p className="second-frame-title">Formulare de completare automată</p>
        <p className="second-frame-subtitle">Completați-vă detaliile doar prin scanarea documentelor personale (ID, pașaport, certificat de înmatriculare a vehiculului).</p>
      </div>
      <div className="second-frame-icon">
        <img alt="iconscan" src={iconscan} height="300" className="iconscan" />
      </div> 
    </div>
  )
}