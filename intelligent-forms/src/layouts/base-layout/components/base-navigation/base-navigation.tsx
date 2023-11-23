import { Menubar } from 'primereact/menubar';
import { Link, useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';                       // core css
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import logoform from '../../../../assets/Artboard 1@4x.png'

export const BaseNavigation = () => {
    const navigate = useNavigate()

    const start = <img src={logoform} className='logo-name' />

    const end =
        <>
            <button onClick={() => {
                navigate('/login');
            }}
                className="first-frame-button-login">
                Conectare
            </button>
            <button onClick={() => {
                navigate('/signup');
            }}
                className="first-frame-button-signup">
                Înregistrare
            </button>
        </>

    return (
        <Menubar start={start} end={end} />
    );
}