import { Menubar } from 'primereact/menubar';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';                       // core css
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme


interface MenuItem {
    label: string;
    icon: string;
    url: string;
}
export const Navigation = () => {
    const items: MenuItem[] = [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            url: '/dashboard'
        },
        {
            label: 'Forms',
            icon: 'pi pi-file',
            url: '/forms'
        },
        {
            label: 'Pricing',
            icon: 'pi pi-money-bill',
            url: '/pricing'
        }
    ];

    return (
        <Menubar model={items} />
    );
}