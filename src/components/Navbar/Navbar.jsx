import './navbar.css'
import menuIcon from '../../assets/menu.png'
import brandLogo from '../../assets/logo.png'
import searchIcon from '../../assets/search.png'
import uploadIcon from '../../assets/upload.png'
import moreIcon from '../../assets/more.png'
import notificationIcon from '../../assets/notification.png'
import profileIcon from '../../assets/jack.png'
import { Link } from 'react-router-dom'

const Navbar = ({ setSidebar }) => {
    return (
        <nav className='flex-div'>
            <div className='nav-left flex-div'>
                <img className='menu-icon' onClick={() => setSidebar(prev => prev === true ? false : true)} src={menuIcon} alt='menu icon' />
                <Link to={'/'} >
                    <img className='logo' src={brandLogo} alt='brand logo' />
                </Link>

            </div>
            <div className="nav-middle flex-div">
                <div className='search-box flex-div'>
                    <input type='text' placeholder='Search' />
                    <img src={searchIcon} alt='' />
                </div>
            </div>
            <div className="nav-right flex-div">
                <img src={uploadIcon} alt="upload icon" />
                <img src={moreIcon} alt="more icon" />
                <img src={notificationIcon} alt="notification icon" />
                <img src={profileIcon} className='user-icon' alt="profile icon" />
            </div>
        </nav>
    )
}

export default Navbar