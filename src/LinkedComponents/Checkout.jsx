import React, { useContext, useEffect, useRef, useState } from "react";
import { WebsiteContext } from "../Contexts/WebsiteContext";
import '../stylesheets/checkout.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

function Checkout() {
    const { address, setIndexToModify, setAddress } = useContext(WebsiteContext);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
    const navigate = useNavigate();

    const handleEditClick = (index) => {
        setIndexToModify(index);
        navigate('/editAddress');
    }

    const handleDelClick = async (index) => {
        let responseData;
        await axios.post('https://nutriipute-backend.vercel.app/delAddress', JSON.stringify({index: index}), {
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        }).then(response => responseData = response.data).catch(error => responseData = error.response.data);
        if(responseData.success) {
            console.log("successfully deleted!");
            setAddress(address.filter((_, i) => i != index));
            navigate('/Checkout');
        }
        else {
            console.log("failed to deleted");
        }
    }

    if (!localStorage.getItem('auth-token')) {
        window.location.replace('/login');
    } else {
        return (
            <div className="Checkout">
                <div className="container">
                    <div className="addAddressOuter">
                        <h1 className="heading" style={address.length>0?{color: "black"}: {color: "hsl(120, 70%, 34%)"}}>Deliver to</h1>
                        <div className="addressContainer" style={address.length>0?{marginTop: "20px"}: null}>
                            {address.map((item, index) => {
                                return (
                                    <div
                                        className={`Address ${selectedAddressIndex === index ? 'selected' : ''}`}
                                        onClick={() => setSelectedAddressIndex(index)}
                                        key={index}>
                                            <h4>{item.Name}</h4>
                                            <p className="num">{item.Phone}</p>
                                            <p className="add">{item.Door}, {item.Street}{item.Locality?`, ${item.Locality}, `: ","} {item.City} - {item.Pincode}</p>
                                            <button className="editAdd" onClick={() => handleEditClick(index)}>Edit Address</button>
                                            <button className="delAdd" onClick={() => handleDelClick(index)}>Delete Address</button>
                                        <input
                                        type="radio"
                                        name="address"
                                        checked={selectedAddressIndex === index}
                                        readOnly
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        {address.length === 0? <h3 className="addAddressReq">Please add Addresses</h3>: null}
                        {address.length >= 3 ? null : <Link to='/addAddress' onClick={() => scrollTo(0, 0)}>Add more</Link>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Checkout;
