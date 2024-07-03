import { WebsiteContext } from '../Contexts/WebsiteContext';
import {Link, useNavigate} from 'react-router-dom';
import '../stylesheets/cart.css';
import React, {useContext} from 'react';

function Cart() {
    const {cartItems, AllProducts, numberOfCartItems, addToCart, removeFromCart, deleteFromCart, subtotalPrice} = useContext(WebsiteContext);
    const navigate = useNavigate();
    console.log(cartItems);
    return (
        <div className="Cart">
            <div className="container">
                {(() => {
                    if(numberOfCartItems>0) {
                        return (
                            <div className="cartItemContainer">
                                <h1 className='cartHeading'>Cart</h1>
                                {AllProducts.map((item, index) => {
                                    if(cartItems[item.Name] > 0) {
                                        return (
                                            <div key={index} className="cartItem">
                                                <Link to={`/${item.product_id}`}>
                                                    <img src={item.Image} alt={item.Name} />
                                                </Link>
                                                <h2>{item.Name}</h2>
                                                <div className='quantityContainer'>
                                                    <i className="fa-solid fa-minus" onClick={() => removeFromCart(item.Name)}></i>
                                                    <div>
                                                        {cartItems[item.Name]}
                                                    </div>
                                                    <i className="fa-solid fa-plus" onClick={() => addToCart(item.Name)}></i>
                                                </div>
                                                <div className='subTotalForOneItem'>
                                                    ₹{cartItems[item.Name]*(Number(item.Offer)?Number(item.Offer):Number(item.Price))}
                                                </div>
                                                <i className="fa-solid fa-xmark" onClick={() => deleteFromCart(item.Name)}></i>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        );
                    }
                    else {
                        return(
                            <div className="shopNow">
                                <Link to="/menu">
                                    <div className="shopNowDialogue">
                                        SHOP NOW!
                                    </div>
                                </Link>
                            </div>
                        );
                    }
                })()}
                <div className="totalContainer">
                    {(()=>{
                        if(numberOfCartItems > 0) {
                            return (
                                <div className='subtotalPrice'>
                                    <div>
                                        <p>Subtotal</p>
                                        <p>₹{subtotalPrice}</p>
                                    </div>
                                    <hr />
                                    <div>
                                        <p>Shipping</p>
                                        <p>Free</p>
                                    </div>
                                    <hr />
                                    <div>
                                        <p>Total</p>
                                        <p>₹{subtotalPrice}</p>
                                    </div>
                                    <hr />
                                    <div className='checkOutContainer'>
                                        <button onClick={() => navigate('/Checkout')}>Check Out</button>
                                    </div>
                                </div>
                            );
                        }
                    })()}
                </div>
            </div>
        </div>
    );
}

export default Cart;