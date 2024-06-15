import { Link, useNavigate } from "react-router-dom";
import '../stylesheets/register.css';
import Logo from '../assets/Logo.png';
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';

axios.defaults.withCredentials = true;

function Register() {
    const [hidden, setHidden] = useState(true);
    const showPasswordRef = useRef();
    const hidePasswordRef = useRef();
    const navigate = useNavigate();
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
    const [cnfrmHidden, setCnfrmHidden] = useState(true);
    const showPasswordRefCnfrm = useRef();
    const hidePasswordRefCnfrm = useRef();
    const handleShowPasswordCnfrm = () => {
        if(cnfrmHidden) {
            setCnfrmHidden(!cnfrmHidden);
            showPasswordRefCnfrm.current.style.display = "none";
            hidePasswordRefCnfrm.current.style.display = "block";
            cnfrmPasswordInput.current.setAttribute("type", "text");
        }
        else {
            setCnfrmHidden(!cnfrmHidden);
            showPasswordRefCnfrm.current.style.display = "block";
            hidePasswordRefCnfrm.current.style.display = "none";
            cnfrmPasswordInput.current.setAttribute("type", "password");
        }
    }
    const [form, setForm] = useState({
        Name: '',
        Email: '',
        Password: ''
    });

    const passwordInput = useRef();
    const cnfrmPasswordInput = useRef();

    const [cnfrmPass, setCnfrmPass] = useState('');

    const nameF = /^[a-zA-Z\s]+$/;
    const emailF = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passF = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W\_])[A-Za-z\d\W\_]+$/;

    const validateForm = async () => {
        form.Name = form.Name.trim();
        form.Email = form.Email.trim();
        form.Email = String(form.Email).toLowerCase()
        if(form.Name.trim() === '' || form.Email.trim() === '' || form.Password.trim() === '' || cnfrmPass.trim() === '') {
            toast.error('Empty Fields');

        }
        else if(!nameF.test(form.Name)) {
            toast.error('Invalid Name format, Name should only contain letters');
        }
        else if(!emailF.test(form.Email)) {
            toast.error('Invalid Email address')
        }
        else if(!passF.test(form.Password)){
            toast.error('Invalid Password format, The password should contain atleast one uppercase letter, one lowercase letter, one digit and a special character!', {duration: 5000});
        }
        else if(form.Password != cnfrmPass) {
            toast.error('Confirm Password should be same as entered Password');
        }
        else {
            let responseData;
            await axios.post('https://nutriipute-backend.vercel.app/register',JSON.stringify(form), {
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json'
                }
            }).then(response => responseData = response.data).catch(error => responseData = error.response.data);
            if(responseData.success) {
                toast.success(() => (<span>
                    Welcome <b>{form.Name}</b>, Please login using your credentials!
                </span>));
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    navigate('/login');
                }, 5000);
            }
            else {
                toast.error(responseData.errors);
            }
        }
    }
    if(localStorage.getItem('auth-token')) {
        window.location.replace('/Profile');
    }
    else {
        return (
            <div className="Register">
                <div className="container">
                    <div className="registrationForm">
                        <Link to='/' className="Logo"><img src={Logo} alt="Nutriipute" /></Link>
                        <label htmlFor="name">Name</label>
                        <input required type="text" value={form.Name} onChange={(e) => setForm({...form, Name:e.target.value})} id="name" />
                        <label htmlFor="email">Email</label>
                        <input required type="text" value={form.Email} id="email" onChange={(e) => setForm({...form, Email:e.target.value})}/>
                        <label htmlFor="password">Password</label>
                        <div className='passwordDiv'>
                            <input required type="password" ref={passwordInput} value={form.Password} onChange={(e) => setForm({...form, Password:e.target.value})} id="password"/>
                            <div className="eyeBtn" onClick={handleShowPassword}>
                                <i ref={showPasswordRef} className="fa-regular fa-eye"></i>
                                <i ref={hidePasswordRef} className="fa-regular fa-eye-slash"></i>
                            </div>
                        </div>
                        <label htmlFor="cnfrmpassword">Confirm Password</label>
                        <div className='passwordDiv'>
                            <input required type="password" ref={cnfrmPasswordInput} value={cnfrmPass} onChange={(e)=>setCnfrmPass(e.target.value)} id="cnfrmpassword"/>
                            <div className="eyeBtn" onClick={handleShowPasswordCnfrm}>
                                <i ref={showPasswordRefCnfrm} className="fa-regular fa-eye"></i>
                                <i ref={hidePasswordRefCnfrm} className="fa-regular fa-eye-slash"></i>
                            </div>
                        </div>
                        <button onClick={validateForm}>Register</button>
                        <p>Already Have an account? <Link to="/Login" onClick={() => window.scrollTo(0, 0)}>Login</Link></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;