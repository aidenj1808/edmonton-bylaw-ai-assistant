import "../CSS/Header.css"
import profileIcon from '../../assets/profileIcon.png'

const Header = ({toggleSidebar}) => {
    return (
      <div class ="head">
        <div class = "left">
            <button onClick={toggleSidebar}>☰</button>
            <h1>Edmonton Bylaws</h1>
        </div>
    
        <div class ="dropdown">
            <button> <img src={profileIcon} alt="Profile" class="profileIcon"/> </button>
            <div class = "content">
                <a href="#">Edit Profile</a>
                <a href="#">Log Out</a>
            </div>
        </div>
      </div>
    );
  }

export default Header;