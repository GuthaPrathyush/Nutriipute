import React, { createContext, useEffect, useMemo, useState } from 'react';
import Breakfast from '../assets/Breakfast';
import Salads from '../assets/Salads';
import BrownRiceBowls from '../assets/BrownRiceBowls';
import ProtienStarters from '../assets/ProtienStarters';
import axios from 'axios';

export const WebsiteContext = createContext(null);

async function getDefaultCart() {
    if(!localStorage.getItem('auth-token')) {
        return {};
    }
    else {
        let responseData;
        await axios.post('http://localhost:5000/getDefaultCart', JSON.stringify({token: localStorage.getItem('auth-token')}), {
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            }
        }).then(response => responseData = response.data).catch(error => responseData = error.response.data);
        if(responseData.success) {
            return responseData.Cart;
        }
        else {
            return {};
        }
    }
}

async function getDefaultAddress() {
    if(!localStorage.getItem('auth-token')) {
        return [];
    }
    else {
        let responseData;
        await axios.post('http://localhost:5000/getAddress', JSON.stringify({token: localStorage.getItem('auth-token')}), {
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            }
        }).then(response => responseData = response.data).catch(error => responseData = error.response.data);
        if(responseData.success) {
            return responseData.Address;
        }
        else {
            return [];
        }
    }
}

const AllProducts = [...Breakfast, ...Salads, ...BrownRiceBowls, ...ProtienStarters];

function WebsiteContextProvider(props) {
    const [cartItems, setCartItems] = useState({});
    const [numberOfCartItems, setNumberOfCartItems] = useState(0);
    const [subtotalPrice, setSubtotalPrice] = useState(0);
    const [address, setAddress] = useState([]);
    const [indexToModify, setIndexToModify] = useState(null);

    useEffect(() => {
        async function fetchDefaultCart() {
            const defaultCart = await getDefaultCart();
            setCartItems(defaultCart);
        }
        async function fetchDefaultAddress() {
            const defaultAddress = await getDefaultAddress();
            setAddress(defaultAddress);
        }
        fetchDefaultAddress();
        fetchDefaultCart();
    }, []);
    console.log(address);

    useEffect(() => {
        let count = 0;
        let price = 0;
        for (const itemName in cartItems) {
            count += cartItems[itemName];
            const item = AllProducts.find(e => e.Name === itemName);
            if (item) {
                price += cartItems[itemName] * (Number(item.Offer) || Number(item.Price));
            }
        }
        setNumberOfCartItems(count);
        setSubtotalPrice(price);
    }, [cartItems]);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [loginInfo, setLoginInfo] = useState({});
    async function addToCart(itemName) {
        console.log(cartItems[itemName]);
        setCartItems((cartItemsCopy) => {
            cartItemsCopy[itemName] = cartItemsCopy[itemName]?cartItemsCopy[itemName]+1: 1;
            return cartItemsCopy;
        });
        const item = AllProducts.find((e) => {
            if(e.Name === itemName) {
                return ({...e});
            }
        });
        console.log(item);
        console.log(cartItems);
        setSubtotalPrice(subtotalPriceCopy => subtotalPriceCopy+(Number(item.Offer)?Number(item.Offer):Number(item.Price)));
        setNumberOfCartItems(numberOfCartItemsCopy => numberOfCartItemsCopy+1);
        console.log(subtotalPrice);
        if(localStorage.getItem('auth-token')) {
            let responseData;
            await axios.post('http://localhost:5000/addToCart', JSON.stringify({itemName: itemName}), {
                headers: {
                    Accept: "application/form-data",
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            }).then(response => responseData = response.data).catch(error => responseData = error.response.data);
            if(responseData.success) {
                console.log("Success");
            }
        }
    }
    async function removeFromCart(itemName) {
        setCartItems((cartItemsCopy) => {
            cartItemsCopy[itemName] = cartItemsCopy[itemName]-1;
            return cartItemsCopy;
        });
        const item = AllProducts.find((e) => {
            if(e.Name === itemName) {
                return ({...e});
            }
        });
        console.log(item);
        if(cartItems[itemName] === 0) {
            delete cartItems[itemName];
        }
        console.log(cartItems);
        setSubtotalPrice(subtotalPriceCopy => subtotalPriceCopy-(Number(item.Offer)?Number(item.Offer):Number(item.Price)));
        setNumberOfCartItems(numberOfCartItemsCopy => numberOfCartItemsCopy-1);
        console.log(cartItems);
        if(localStorage.getItem('auth-token')) {
            let responseData;
            await axios.post('http://localhost:5000/removeFromCart', JSON.stringify({itemName: itemName}), {
                headers: {
                    Accept: "application/form-data",
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            }).then(response => responseData = response.data).catch(error => responseData = error.response.data);
            if(responseData.success) {
                console.log("Success");
            }
        }
    }
    async function deleteFromCart(itemName) {
        const item = AllProducts.find((e) => {
            if(e.Name === itemName) {
                return ({...e});
            }
        });
        console.log(item);
        setSubtotalPrice(subtotalPrice-cartItems[itemName]*(Number(item.Offer)?Number(item.Offer):Number(item.Price)));
        setNumberOfCartItems(numberOfCartItems-cartItems[itemName]);
        console.log(numberOfCartItems);
        delete cartItems[itemName];
        console.log(`Deleted ${itemName}`);
        if(localStorage.getItem('auth-token')) {
            let responseData;
            await axios.post('http://localhost:5000/deleteFromCart', JSON.stringify({itemName: itemName}), {
                headers: {
                    Accept: "application/form-data",
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            }).then(response => responseData = response.data).catch(error => responseData = error.response.data);
            if(responseData.success) {
                console.log("Success");
            }
        }
    }
    const contextValue = {AllProducts, cartItems, addToCart, removeFromCart, deleteFromCart, numberOfCartItems, subtotalPrice, address, indexToModify, setIndexToModify};
    return (
        <WebsiteContext.Provider value={contextValue}>
            {props.children}
        </WebsiteContext.Provider>
    );
}

export default WebsiteContextProvider;