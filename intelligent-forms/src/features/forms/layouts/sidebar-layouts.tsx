import QRCode from "react-qr-code";

interface Props {
    activeForm: any;
}

export const QRLayout = (
    { activeForm }: Props
) => {
    return (
        <div className="link">
            <h1>{activeForm.title}</h1>
            <h3>Scanează QR-ul de mai jos pentru a completa formularul</h3>
            <div className='qr-container'>
                <QRCode
                    bgColor="#FFFFFF"
                    fgColor="#3c39e8"
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={activeForm.fillFormUrl}
                    viewBox={`0 0 256 256`}
                />
            </div>
        </div>
    )
}

export const LinkLayout = (
    { activeForm }: Props
) => {
    return (
        <div className="link">
            <h1>Fill {activeForm.title}</h1>
            <h3>Browse link below to fill the form</h3>
            <h4 className="form-link">{activeForm.fillFormUrl}</h4>
        </div>
    )
}
