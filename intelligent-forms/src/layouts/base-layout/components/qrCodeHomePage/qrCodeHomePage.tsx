import qrCode from "../../../../assets/qrcode.jpg";

const QRCode = () => {
  return (
    <div className="qrCodeHomePage">
        <img src={qrCode} alt="qrcode" />
        <p>Scanează codul QR și începe!</p>
    </div>
  )
}

export default QRCode