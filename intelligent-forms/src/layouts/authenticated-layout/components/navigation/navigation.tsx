import { Menubar } from "primereact/menubar";
import { Link, useNavigate } from "react-router-dom";
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css"; // core css
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "./navigation.css";
import logo from "../../../../assets/Artboard 1@4x.png";
import { logoutUser } from "../../../../features/auth/api";

interface MenuItem {
    label: string;
    icon: string;
    url: string;
}
export const Navigation = () => {
    const navigate = useNavigate();
    const items: MenuItem[] = [
        {
            label: "Formulare",
            icon: "pi pi-file",
            url: "/dashboard/forms",
        },
    ];

    const start = (
        <a href="/">
            <img src={logo} className="logo-name" />
        </a>
    );

    const end = (
        <button onClick={logoutUser} className="logout-button">
            Deconectează-te
        </button>
    );

    return <Menubar model={items} start={start} end={end} />;
};
