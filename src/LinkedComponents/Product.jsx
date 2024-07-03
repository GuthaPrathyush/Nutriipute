import React, {useContext} from 'react';
import { Link, useParams } from 'react-router-dom';
import Error from './Error';
import '../stylesheets/product.css';
import { WebsiteContext } from '../Contexts/WebsiteContext';
import {toast} from 'react-hot-toast';


function Product() {
    const {addToCart, AllProductsMulti} = useContext(WebsiteContext);
    let { product_id } = useParams();
    const index = product_id.indexOf('-');
    if(index === -1) {
        return (<Error/>);
    }
    const domain = String(product_id.substring(0, index)).replace(/_/g, ' ').toLowerCase();
    const productSection = AllProductsMulti.find((item) => String(item[0].Section).toLowerCase() === domain);
    if(productSection == null) {
        return (<Error></Error>);
    }
    const product = productSection.find((item) => String(item.product_id).toLowerCase() === product_id.toLowerCase());
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