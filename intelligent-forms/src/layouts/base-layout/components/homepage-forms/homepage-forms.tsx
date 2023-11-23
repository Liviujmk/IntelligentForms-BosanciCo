import { useRef } from "react";
import CardHomePageForms from "../cardHomePage-forms/CardHomePageForms";
import style from './homepage-forms.module.css'

interface Props {
  myRef: any
}

const HomepageForms = ({myRef}: Props) => {  
  return (
    <div ref={myRef} className={style.mainHomePage}>
      <h1 className={style.titleHomePageForms}>Formulare populare</h1>
      <div className={style.containerHomePageForms}>
          <CardHomePageForms title="Înregistrează-ți mașina" />
          <CardHomePageForms title="Validează-ți id-ul" />
          <CardHomePageForms title="Validează-ți pașaportul" />
      </div>
    </div>
  )
}

export default HomepageForms