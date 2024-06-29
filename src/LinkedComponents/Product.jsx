import React, {useContext} from 'react';
import { Link, useParams } from 'react-router-dom';
import Error from './Error';
import '../stylesheets/product.css';
import { WebsiteContext } from '../Contexts/WebsiteContext';
import {toast} from 'react-hot-toast';


function Product() {
    let { domain, productName } = useParams();
    console.log(domain);
    const {addToCart, AllProducts} = useContext(WebsiteContext);
    productName = String(productName).replace(/_/g, ' ');
    const product = AllProducts.find((item) => item.Name.toLowerCase() === productName.toLowerCase() && String(domain).toLowerCase() === item.Domain.toLowerCase());
    if(product == null) {
        return (<Error></Error>);
    }
    function getPrice() {
        if(Number(product.Offer) || (Number(product.Offer) > 0 && Number(product.Offer) < Number(product.Price))) {
            return (
                <h3><sup><del>₹{product.Price}</del></sup> ₹{product.Offer}</h3>
            );
        }
        else {
            return (
                <h3>₹{product.Price}</h3>
            );
        }
    }
    return (
        <div className="Product">
            <div className="container">
                <div className="productImage">
                    <img src={product.Image} alt={product.Name} />
                </div>
                <div className="productDetails">
                    <h1>{product.Name}</h1>
                    <p>{product.Description}</p>
                    <div className="Macro">
                        <h3>Macro</h3>
                        <ul>
                            {Object.entries(product.Macro).map(([key, value]) => 
                                <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}gms</li>
                            )}
                        </ul>

                    </div>
                    <div className="pricingAndBuying">
                        {product.InStock && getPrice()}
                        {(() => {
                            if(product.InStock) {
                                return (
                                    <div className='BuyAddToCartContainer'>
                                    <button className="AddToCart" onClick={() => {addToCart(product.Name); toast.success("Added to Cart!", {position: "top-right", style: {position: "relative", top: "70px", right: "5px"}})}}>Add to Cart</button>
                                    <button className="Buy">Buy Now</button>
                                    </div>
                                );
                            }
                            else {
                                return (
                                    <div className="outOfStock">
                                        <p>This Product is Currently Unavailable!</p>
                                        <Link to='/menu' onClick={() => scrollTo(0, 0)}><button>View more</button></Link>
                                    </div>
                                );
                            }
                        })()}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Product;