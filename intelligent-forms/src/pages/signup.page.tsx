import { Link } from "react-router-dom";
import { BaseLayout } from "../layouts/base-layout/base.layout";
import { Register } from "../layouts/base-layout/components/register-form/register-form";

export const Signup = () => {
    return (
        <div className="goToMainPage"> 
            <Register />
            <p>Ai deja un cont? <span><Link to={'/login'}>Conectează-te acum!</Link></span></p>
            <Link to={'/'}>Mergin la pagina principală</Link>
        </div>
    )
};
