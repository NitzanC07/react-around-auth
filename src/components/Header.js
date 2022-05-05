import { NavLink, useParams } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
    console.log(props);

    return(
        <header className="header">
            <img className='logo' src={logo} alt='Logo picture' />
            <div>
                <NavLink to='/' className='header__links'>{props.isLoggedIn ? props.user.name : ''}</NavLink>
                <NavLink to='/signin' className='header__links'> {props.isLoggedIn ? 'Log out' : 'Log in'}</NavLink>
            </div>
            
            
        </header>
    )    
}

export default Header;