import { useRef } from "react";
import CardHomePageForms from "../cardHomePage-forms/CardHomePageForms";
import style from "./homepage-forms.module.css";

interface Props {
    myRef: any;
}

const HomepageForms = ({ myRef }: Props) => {
    return (
        <div ref={myRef} className={style.mainHomePage}>
            <h1 className={style.titleHomePageForms}>Formulare populare</h1>
            <div className={style.containerHomePageForms}>
                <CardHomePageForms
                    title="Înregistrează-ți mașina"
                    link="fill/655f5834f7debd377e0bcd05"
                />
                <CardHomePageForms
                    title="Validează-ți id-ul"
                    description="În curând"
                    link="/"
                />
                <CardHomePageForms
                    title="Validează-ți pașaportul"
                    link="fill/655f57c8f7debd377e0bcc55"
                />
            </div>
        </div>
    );
};

export default HomepageForms;
