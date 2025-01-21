import '../stylesheets/footer.css';
import Logo from '../assets/Logo.png';
import {Link} from 'react-router-dom';

function Footer() {
    return (
        <div className="Footer">
            <img src={Logo} alt="Nutriipute" />
            <div className="signInDialogue">
                <Link to='/Login' onClick={() => window.scrollTo(0, 0)}><button>Sign in</button></Link>
                <p>New customer? <Link to="/Register" onClick={() => window.scrollTo(0, 69)}>Register</Link></p>
            </div>
            <div className="footerMenu">
                <Link to='/Menu' onClick={() => window.scrollTo(0, 0)}>Products</Link>
                <Link to='/About' onClick={() => window.scrollTo(0, 0)}>About</Link>
                <Link to='/Contact' onClick={() => window.scrollTo(0, 0)}>Contact</Link>
                <Link to='/Help' onClick={() => window.scrollTo(0, 0)}>Help</Link>
            </div>
            <div className="followUs">
                <h3>Follow us on</h3>
                <div className='socialMediaContainer'>
                    <i className="fa-brands fa-youtube" style={{color: "#FF0000"}}></i>
                    <i className="fa-brands fa-instagram" style={{color: "#DD2A7B"}}></i>
                    <i className="fa-brands fa-whatsapp" style={{color: "#128C7E"}}></i>
                    <i className="fa-brands fa-x-twitter" style={{color: "black"}}></i>
                    <i className="fa-brands fa-facebook" style={{color: "#2D68C4"}}></i>
                </div>
            </div>
            <hr />
            <p>&copy;2023-{new Date().getFullYear()}, Nutriipute - All Rights Reserved</p>
        </div>
    );
}

export default Footer;