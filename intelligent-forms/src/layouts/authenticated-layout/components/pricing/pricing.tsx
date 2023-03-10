import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import './pricing.css'

export const Pricing = () => {
  const price1 = {
    title: 'Free',
    price: '',
    features: [
      '3 Forms',
      'Email Support',
    ],
  };

  const price2 = {
    title: 'Normal',
    price: '$55 / month',
    features: [
      '50 Forms',
      'Email Support',
      '24/7 Support',
    ],
  };

  const price3 = {
    title: 'Premium',
    price: '$100 / month',
    features: [
      'Unlimited Forms',
      'Email Support',
      '24/7 Support',
      'Advanced Security',
    ],
  };

  return (
    <div>
      <div className="p-grid p-nogutter p-mt-4 flex align-items-center justify-content-center panel">
        <Card className="pricing-card-left"title={price1.title} subTitle={price1.price} footer={<Button label="Choose plan" className="pricing-button-left" />}>
          <ul>
            {price1.features.map((feature) => (
            <li key={feature}>{feature}</li>
            ))}
          </ul>
        </Card>
        <Card className="pricing-card-mid" title={price2.title} subTitle={price2.price} footer={<Button label="Choose plan" className="pricing-button-mid" />}>
          <ul>
            {price2.features.map((feature) => (
            <li key={feature}>{feature}</li>
            ))}
          </ul>
        </Card>
        <Card className="pricing-card-right" title={price3.title} subTitle={price3.price} footer={<Button label="Choose plan" className="pricing-button-right" />}>
          <ul>
            {price3.features.map((feature) => (
            <li key={feature}>{feature}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}