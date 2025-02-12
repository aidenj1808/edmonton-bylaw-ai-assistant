import "../CSS/Header.css"
import profileIcon from '../../assets/profileIcon.png'

const Header = () => {
    return (
      <div class ="head">
        <div class = "left">
            <button>☰</button>
            <h1>Edmonton Bylaws</h1>
        </div>
    
        <div class ="dropdown">
            <button> <img src={profileIcon} alt="Profile" class="profileIcon"/> </button>
            <div class = "content">
                <a>Edit Profile</a>
                <a>Log Out</a>
            </div>
        </div>
      </div>
    );
  }

export default Header;