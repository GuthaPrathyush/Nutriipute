import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';

export const WebsiteContext = createContext(null);
axios.defaults.withCredentials = true;

async function getDefaultCart() {
    if(!localStorage.getItem('auth-token')) {
        return {};
    }
    else {
        let responseData;
        await axios.post('https://nutriipute-backend.vercel.app/getDefaultCart', JSON.stringify({token: localStorage.getItem('auth-token')}), {
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
        await axios.post('https://nutriipute-backend.vercel.app/getAddress', JSON.stringify({token: localStorage.getItem('auth-token')}), {
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

async function getDefaultProducts()  {
    let responseData = null;
    await axios.post('https://nutriipute-backend.vercel.app/getAllProducts', JSON.stringify({token: "Your auth-token"}), {
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => responseData = response.data.Products).catch((error) => responseData = []);
    return responseData;
}


function WebsiteContextProvider(props) {
    const [cartItems, setCartItems] = useState({});
    const [numberOfCartItems, setNumberOfCartItems] = useState(0);
    const [subtotalPrice, setSubtotalPrice] = useState(0);
    const [address, setAddress] = useState([]);
    const [indexToModify, setIndexToModify] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [AllProducts, setAllProducts] = useState([]);
    const [AllProductsMulti, setAllProductsMulti] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            
        }
        fetchProducts();
    });
    useEffect(() => {
        async function fetchDefaultDetails() {
            const defaultCart = await getDefaultCart();
            const defaultProducts = await getDefaultProducts();
            const defaultAddress = await getDefaultAddress();
            let count = 0;
            let price = 0;
            console.log(defaultProducts);
            const defaultProductsFlat = defaultProducts.flat();
            for (const product_id in defaultCart) {
                count += defaultCart[product_id];
                const item = defaultProductsFlat.find(e => e.product_id === product_id);
                if (item) {
                    price += defaultCart[product_id] * (Number(item.Offer) || Number(item.Price));
                }
                console.log(price);
            }
            setAllProductsMulti(defaultProducts);
            setAllProducts(defaultProductsFlat);
            setNumberOfCartItems(count);
            setSubtotalPrice(price);
            setCartItems(defaultCart);
            setAddress(defaultAddress);
            setLoaded(true);
        }
        fetchDefaultDetails();
    }, []);
    async function addToCart(product_id) {
        setCartItems((cartItemsCopy) => {
            cartItemsCopy[product_id] = cartItemsCopy[product_id]?cartItemsCopy[product_id]+1: 1;
            return cartItemsCopy;
        });
        const item = AllProducts.find((e) => {
            if(e.product_id === product_id) {
                return ({...e});
            }
        });
        setSubtotalPrice(subtotalPriceCopy => subtotalPriceCopy+(Number(item.Offer)?Number(item.Offer):Number(item.Price)));
        setNumberOfCartItems(numberOfCartItemsCopy => numberOfCartItemsCopy+1);
        if(localStorage.getItem('auth-token')) {
            let responseData;
            await axios.post('https://nutriipute-backend.vercel.app/addToCart', JSON.stringify({product_id: product_id}), {
                headers: {
                    Accept: "application/form-data",
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            }).then(response => responseData = response.data).catch(error => responseData = error.response.data);
        }
    }
    async function removeFromCart(product_id) {
        if(cartItems[product_id] == 0) {
            return ;
        }
        setCartItems((cartItemsCopy) => {
            cartItemsCopy[product_id] = cartItemsCopy[product_id]-1;
            return cartItemsCopy;
        });
        const item = AllProducts.find((e) => {
            if(e.product_id === product_id) {
                return ({...e});
            }
        });
        console.log(item);
        if(cartItems[product_id] === 0) {
            delete cartItems[product_id];
        }
        console.log(cartItems);
        setSubtotalPrice(subtotalPriceCopy => subtotalPriceCopy-(Number(item.Offer)?Number(item.Offer):Number(item.Price)));
        setNumberOfCartItems(numberOfCartItemsCopy => numberOfCartItemsCopy-1);
        console.log(cartItems);
        if(localStorage.getItem('auth-token')) {
            let responseData;
            await axios.post('https://nutriipute-backend.vercel.app/removeFromCart', JSON.stringify({product_id: product_id}), {
                headers: {
                    Accept: "application/form-data",
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            }).then(response => responseData = response.data).catch(error => responseData = error.response.data);
        }
    }
    async function deleteFromCart(product_id) {
        const item = AllProducts.find((e) => {
            if(e.product_id === product_id) {
                return ({...e});
            }
        });
        console.log(item);
        setSubtotalPrice(subtotalPrice-cartItems[product_id]*(Number(item.Offer)?Number(item.Offer):Number(item.Price)));
        setNumberOfCartItems(numberOfCartItems-cartItems[product_id]);
        console.log(numberOfCartItems);
        delete cartItems[product_id];
        console.log(`Deleted ${product_id}`);
        if(localStorage.getItem('auth-token')) {
            let responseData;
            await axios.post('https://nutriipute-backend.vercel.app/deleteFromCart', JSON.stringify({product_id: product_id}), {
                headers: {
                    Accept: "application/form-data",
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            }).then(response => responseData = response.data).catch(error => responseData = error.response.data);
        }
    }
    const contextValue = {AllProducts, cartItems, addToCart, removeFromCart, deleteFromCart, numberOfCartItems, subtotalPrice, address, setAddress, indexToModify, setIndexToModify, loaded, AllProductsMulti};
    return (
        <WebsiteContext.Provider value={contextValue}>
            {props.children}
        </WebsiteContext.Provider>
    );
}

export default WebsiteContextProvider;