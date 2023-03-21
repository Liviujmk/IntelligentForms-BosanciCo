import { Link } from "react-router-dom";
import { BaseLayout } from "../layouts/base-layout/base.layout";
import { Register } from "../layouts/base-layout/components/register-form/register-form";

export const Signup = () => {
    return (
        <>
            <Register />
            <p>Already have an account? <span><Link to={'/login'}>Login Now!</Link></span></p>
            <Link to={'/'}>Go to HomePage</Link>
        </>
    )
};
