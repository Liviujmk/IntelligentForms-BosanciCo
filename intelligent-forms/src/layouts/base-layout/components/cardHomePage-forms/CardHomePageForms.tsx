import style from "./CardHomePageForms.module.css";
import { Link } from "react-router-dom";
import check from "../../../../assets/check.png";

interface Props {
    title: string;
    description?: string;
    link: string
}

const CardHomePageForms = ({ title, description, link }: Props) => {
    return (
        <div className={style.cardHomePageForm}>
            <div>
                <img src={check} alt="check" width={70} />
            </div>
            <h1>{title}</h1>
            <Link to={link} className={style.btnPrimaryHomePage}>
                {description ? description : "Începeți"}
            </Link>
        </div>
    );
};

export default CardHomePageForms;
