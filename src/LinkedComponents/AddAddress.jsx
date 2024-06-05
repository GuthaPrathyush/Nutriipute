import {Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import '../stylesheets/addAddress.css';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import { useRef, useState, useContext } from 'react';
import { WebsiteContext } from '../Contexts/WebsiteContext';

axios.defaults.withCredentials = true;

function AddAddress() {
    const [form, setForm] = useState({
        Name: "",
        Phone: "",
        Door: '',
        Street: '',
        Locality: '',
        City: '',
        Pincode: ''
    });
    const handlePhoneInputChange = (value) => {
        setForm({ ...form, Phone: value });
    }
    const handleInputChange = (e) => {
        setForm({...form, [e.target.getAttribute('name')]: e.target.value});
    }

    const {address, setAddress} = useContext(WebsiteContext);
    const registrationErrorMessage = useRef();

    const navigate = useNavigate();

    const nameF = /^[a-zA-Z\s]+$/;
    const phoneF = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    const pincodeF = /^\d{6}$/;

    const validateForm = async () => {
        form.Name = form.Name.trim();
        form.Phone = form.Phone.trim();
        form.Door = form.Door.trim();
        form.Street = form.Street.trim();
        form.Locality = form.Locality.trim();
        form.City = form.City.trim();
        form.Pincode = form.Pincode.trim();
        if(form.Name.trim() === '' || form.Phone.trim() === '' || form.Door.trim() === '' || form.Street.trim() === '' || form.City.trim() === '' || form.Pincode.trim() === '') {
            registrationErrorMessage.current.textContent = 'Empty Fields';
        }
        else if(!nameF.test(form.Name)) {
            registrationErrorMessage.current.textContent = 'Invalid Name format, Name should only contain letters';
        }
        else if(!phoneF.test(form.Phone.trim())) {
            registrationErrorMessage.current.textContent = 'Invalid Phone number';
        }
        else if(!pincodeF.test(form.Pincode)){
            registrationErrorMessage.current.textContent = 'Invalid Pincode format';
        }
        else {
            let responseData;
            await axios.post('https://nutriipute-backend.vercel.app/addAddress',JSON.stringify(form), {
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            }).then(response => responseData = response.data).catch(error => responseData = error.response.data);
            console.log(responseData);
            if(responseData.success) {
                registrationErrorMessage.current.style.color = "green";
                registrationErrorMessage.current.textContent = `Address added successfully`;
                console.log(address);
                console.log(form);
                setAddress([...address, form]);
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    navigate("/Checkout");
                }, 1000);
            }
            else {
                registrationErrorMessage.current.style.color = "red";
                registrationErrorMessage.current.textContent = responseData.errors;
            }
        }
    }
    if(!localStorage.getItem('auth-token') || address.length >= 3) {
        window.location.replace('/login');
    }
    return (
        <div className="addAddress">
            <div className="container">
                <div className="addressForm">
                    <Link to='/' className="Logo"><img src={Logo} alt="Nutriipute" /></Link>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="Name" value={form.Name} onChange={(e) => handleInputChange(e)}/>
                    <label htmlFor="phone">Phone</label>
                    <PhoneInput 
                    value={form.Phone} 
                    onChange={(val) => handlePhoneInputChange(val)} 
                    defaultCountry='IN'
                    className='phoneInput'
                    id="phone"
                    />
                    <div className='doorNStreet'>
                        <div>
                            <label htmlFor="door">Door No.</label>
                            <input type="text" id="door" name="Door" value={form.Door} onChange={(e) => handleInputChange(e)}/>
                        </div>
                        <div>
                            <label htmlFor="street">Street</label>
                            <input type="text" id="street" name="Street" value={form.Street} onChange={(e) => handleInputChange(e)}/>
                        </div>
                    </div>
                    <div className='doorNStreet'>
                        <div>
                            <label htmlFor="locality">Locality</label>
                            <input type="text" id="locality" name="Locality" value={form.Locality} onChange={(e) => handleInputChange(e)}/>
                        </div>
                        <div>
                            <label htmlFor="pincode">Pincode</label>
                            <input type="text" id="pincode" name="Pincode" value={form.Pincode} onChange={(e) => handleInputChange(e)}/>
                        </div>
                    </div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="City" value={form.City} onChange={(e) => handleInputChange(e)}/>
                    <div className='registrationErrorMessage' ref={registrationErrorMessage}></div>
                    <button onClick={validateForm}>Add Address</button>
                </div>
            </div>
        </div>
    );
}

export default AddAddress;