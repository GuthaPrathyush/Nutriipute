import { useRef, useState } from 'react';
import '../stylesheets/login.css'
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import axios from 'axios';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const showPasswordRef = useRef();
    const hidePasswordRef = useRef();
    const passwordInput = useRef();
    const [hidden, setHidden] = useState(true);
    const handleShowPassword = () => {
        if(hidden) {
            setHidden(!hidden);
            showPasswordRef.current.style.display = "none";
            hidePasswordRef.current.style.display = "block";
            passwordInput.current.setAttribute("type", "text");
        }
        else {
            setHidden(!hidden);
            showPasswordRef.current.style.display = "block";
            hidePasswordRef.current.style.display = "none";
            passwordInput.current.setAttribute("type", "password");
        }
    }
    const registrationErrorMessage = useRef();
    const Login = async () => {
        setEmail(String(email).toLowerCase());
        let responseData;
        await axios.post('http://localhost:5000/login',JSON.stringify({Email: email, Password: password}), {
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            }
        }).then(response => responseData = response.data).catch(error => responseData = error.response.data);
        console.log(responseData);
        if(responseData.success) {
            registrationErrorMessage.current.style.color = "green";
            registrationErrorMessage.current.textContent = 'Login Successful!';
            localStorage.setItem('auth-token', responseData.token);
            setTimeout(() => window.location.replace('/'), 2000);
        }
        else {
            registrationErrorMessage.current.style.color = "red";
            registrationErrorMessage.current.textContent = responseData.errors;
        }
    }
    if(localStorage.getItem('auth-token')) {
        window.location.replace('/Profile');
    }
    else {
        return (
            <div className="Login">
                <div className="container">
                    <div className="loginForm">
                        <Link to='/' className="Logo"><img src={Logo} alt="Nutriipute" /></Link>
                        <label htmlFor="email">Email</label>
                        <input type="text" value={email} id="email" onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                        <div className='passwordDiv'>
                            <input type="password" ref={passwordInput} value={password} onChange={(e) => setPassword(e.target.value)} id="password"/>
                            <div className="eyeBtn" onClick={handleShowPassword}>
                                <i ref={showPasswordRef} className="fa-regular fa-eye"></i>
                                <i ref={hidePasswordRef} className="fa-regular fa-eye-slash"></i>
                            </div>
                        </div>
                        <div className="registrationErrorMessage" ref={registrationErrorMessage}></div>
                        <button onClick={Login}>Login</button>
                        <p>New customer? <Link to="/Register" onClick={() => window.scrollTo(0, 69)}>Register</Link></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;