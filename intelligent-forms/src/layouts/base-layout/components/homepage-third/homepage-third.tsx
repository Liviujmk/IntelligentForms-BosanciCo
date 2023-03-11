import './homepage-third.css'
import customfiles from '../../../../assets/customfiles.png'

export const ThirdFrame = () => {
  return (
    <div className="third-frame">
      <div className="third-frame-icon">
        <img alt="customfiles" src={customfiles} height="300" className="customfiles"></img>
      </div> 
      <div className="third-frame-text">
        <p className="third-frame-title">Generate Custom Forms</p>
        <p className="third-frame-subtitle">Create individual sections of the form and place them in every order you need.</p>
      </div>
    </div>
  )
}