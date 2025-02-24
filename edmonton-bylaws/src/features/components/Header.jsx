import "../CSS/Header.css"
import profileIcon from '../../assets/profileIcon.png'
import { Link } from 'react-router-dom'

const Header = ({toggleSidebar}) => {
    return (
      <div class ="head">
        <div class = "left">
            <button onClick={toggleSidebar}>☰</button>
            <h1><Link to="/home" onClick={() => history.push('/home')} class="link-home">Edmonton Bylaws</Link></h1>
        </div>
    
        <div class ="dropdown">
            <button> <img src={profileIcon} alt="Profile" class="profileIcon"/> </button>
            <div class = "content">
                <Link to="/edit-profile">Edit Profile</Link>
                <Link to="/">Log Out</Link>
            </div>
        </div>
      </div>
    );
  }

export default Header;