import { Menubar } from 'primereact/menubar';
import { Link, useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';                       // core css
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import './navigation.css'
import logoform from '../../../../assets/logoform.png'
import Cookies from 'js-cookie';
import { logoutUser } from '../../../../features/auth/api';

interface MenuItem {
    label: string;
    icon: string;
    url: string;
}
export const Navigation = () => {
    const navigate = useNavigate()
    const items: MenuItem[] = [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            url: '/dashboard'
        },
        {
            label: 'Forms',
            icon: 'pi pi-file',
            url: '/dashboard/forms'
        },
        {
            label: 'Pricing',
            icon: 'pi pi-money-bill',
            url: '/dashboard/pricing'
        }
    ];
    const start = <img alt="logo" src={logoform} height="60" className="mr-2"></img>;
    const end =
        <button onClick={logoutUser}
            className='logout-button'>
            Log out
        </button>

    return (
        <Menubar model={items} start={start} end={end} />
    );
}