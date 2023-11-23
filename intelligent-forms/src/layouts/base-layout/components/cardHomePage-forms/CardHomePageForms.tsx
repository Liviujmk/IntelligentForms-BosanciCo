import style from "./CardHomePageForms.module.css";
import { Link } from "react-router-dom";
import check from "../../../../assets/check.png";

interface Props {
    title: String;
}

const CardHomePageForms = ({ title }: Props) => {
    return (
        <div className={style.cardHomePageForm}>
            <div>
                <img src={check} alt="check" width={70} />
            </div>
            <h1>{title}</h1>
            <Link to="/" className={style.btnPrimaryHomePage}>
                Începeți
            </Link>
        </div>
    );
};

export default CardHomePageForms;
