import './homepage-third.css'
import customfiles from '../../../../assets/customfiles.png'

export const ThirdFrame = () => {
  return (
    <div className="third-frame">
      <div className="third-frame-icon">
        <img alt="customfiles" src={customfiles} height="300" className="customfiles"></img>
      </div> 
      <div className="third-frame-text">
        <p className="third-frame-title">Generați formulare personalizate</p>
        <p className="third-frame-subtitle">Creați secțiuni individuale ale formularului și plasați-le în fiecare ordine de care aveți nevoie.</p>
      </div>
    </div>
  )
}