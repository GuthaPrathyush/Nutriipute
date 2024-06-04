import { WebsiteContext } from '../Contexts/WebsiteContext';
import Logo from '../assets/Logo.png';
import '../stylesheets/nav.css';
import {Link, useNavigate } from 'react-router-dom';
import React, { useContext, useState, useRef } from 'react';

function NavigationBar() {
    const navigate = useNavigate();
    const menuRef = useRef();
    const [searchText, setSearchText] = useState("");

    const profileOptions = useRef();

    const handleSearchBar = (e) => {
        setSearchText(e.target.value);
    }   
    const openMenu = () => {
        menuRef.current.classList.toggle("activeMenu");
    }
    const searchItem = (e) => {
        if(e.keyCode === 13) {
            if(searchText.trim() !== '') {
                navigate(`/Search/${searchText.replace(/ /g, "_")}`);
            }
            // search for the item in the backend
            // searchBackend(searchText);
            setSearchText('');
        }
    }
    const searchItemBtn = () => {
        if(searchText.trim() !== '') {
            navigate(`/Search/${searchText.replace(/ /g, "_")}`);
        }
        // search for the item in the backend
        // searchBackend(searchText);
        setSearchText('');
    }    
    const {numberOfCartItems} = useContext(WebsiteContext);
    const logout = () => {
        localStorage.removeItem('auth-token');
        location.replace('/');
    }
    return (
        <nav>
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <img className='Logo' src={Logo} alt="Nutriipute" />
            </Link>
            <div className='Search'>
                <input type="text" value={searchText} onKeyDown={(e) => searchItem(e)} onChange={(e) => handleSearchBar(e)}/>
                <div onClick={searchItemBtn}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
            <ul ref={menuRef} className='Elements'>
                <li><Link onClick={() => {window.scrollTo(0, 0); menuRef.current.classList.remove("activeMenu");}} to="/about">About</Link></li>
                <li><Link onClick={() => {window.scrollTo(0, 0); menuRef.current.classList.remove("activeMenu");}} to="/menu">Menu</Link></li>
                <li><Link onClick={() => {window.scrollTo(0, 0); menuRef.current.classList.remove("activeMenu");}} to="/help">Help</Link></li>
                <li><Link onClick={() => {window.scrollTo(0, 0); menuRef.current.classList.remove("activeMenu");}} to="/Orders">My Orders</Link></li>
                {
                localStorage.getItem('auth-token')?
                <li className='userProfile' onClick={() => profileOptions.current.classList.toggle('active')}>
                    <div className='profileImage'><i className="fa-solid fa-user"></i></div>
                    <div className="profileOptions" ref={profileOptions}>
                        <p>check</p>
                        <ul>
                            <li>View Profile</li>
                            <li onClick={logout}>Logout</li>
                        </ul>
                    </div>
                </li>:
                <li className="loginRegister"><Link to='/Login' onClick={() => {window.scrollTo(0, 0); menuRef.current.classList.remove("activeMenu");}}>
                <div>
                    <div><i className="fa-solid fa-user"></i></div>
                    <p>Login</p>
                    <p>&Register</p>
                </div>
                </Link></li>
                }
                <i className="fa-solid fa-xmark" onClick={() => menuRef.current.classList.remove("activeMenu")}></i>
            </ul>
            <div className='cartDiv'>
                <Link to='/Cart' className='cartBlock' onClick={() => window.scrollTo(0, 0)}>
                    <i className="fa-solid fa-cart-shopping"></i>
                    <div className='numberOfItemsInTheCart'>{numberOfCartItems}</div>
                </Link>
                <div onClick={openMenu} className="responsiveNav">
                    <i className="fa-solid fa-bars"></i>
            </div>
            </div>
        </nav>
    );
}

export default NavigationBar;