import { Menubar } from 'primereact/menubar';
import { Link, useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';                       // core css
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import logoform from '../../../../assets/logoform.png'

export const BaseNavigation = () => {
    const navigate = useNavigate()
    const start = <img
        alt="logo"
        src={logoform}
        height="60"
        className="mr-2"
    >
    </img>;
    const end =
        <>
            <button onClick={() => {
                navigate('/login');
            }}
                className="first-frame-button-login">
                Log In
            </button>
            <button onClick={() => {
                navigate('/signup');
            }}
                className="first-frame-button-signup">
                Register
            </button>
        </>

    return (
        <Menubar start={start} end={end} />
    );
}