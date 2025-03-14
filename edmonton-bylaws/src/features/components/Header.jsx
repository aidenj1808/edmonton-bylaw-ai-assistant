import "../CSS/Header.css"
import profileIcon from '../../assets/profileIcon.png'
import { Link, useNavigate } from 'react-router-dom'

const Header = ({toggleSidebar, userData}) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/edit-profile', { state: userData });
  };
  
    return (
      <div class ="head">
        <div class = "left">
            <button onClick={toggleSidebar}>☰</button>
            <h1><button onClick={() => navigate("/home", { state: {selected: []} })} class="link-home">Edmonton Bylaws</button></h1>
        </div>
    
        <div class ="dropdown">
            <button> <img src={profileIcon} alt="Profile" class="profileIcon"/> </button>
            <div class = "content">
              <Link to={{ pathname: '/edit-profile', state: userData }}>Edit Profile</Link>
              <Link to="/">Log Out</Link>
            </div>
        </div>
      </div>
    );
  }

export default Header;