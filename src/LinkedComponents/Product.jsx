import React, {useContext} from 'react';
import { Link, useParams } from 'react-router-dom';
import Breakfast from '../assets/Breakfast';
import Salads from '../assets/Salads';
import BrownRiceBowls from '../assets/BrownRiceBowls';
import ProtienStarters from '../assets/ProtienStarters';
import '../stylesheets/product.css';
import { WebsiteContext } from '../Contexts/WebsiteContext';

const menu = [Breakfast, Salads, BrownRiceBowls, ProtienStarters];

function Product(props) {
    let { productName } = useParams();
    productName = String(productName).replace(/_/g, ' ');
    const page = Number(props.page);
    const domain = menu[page];
    const product = domain.find((item) => item.Name === productName);
    const {addToCart} = useContext(WebsiteContext);
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
        <div className="container">
            <div className="Product">
                <h1>{product.Name}</h1>
                <img src={product.Image} alt={product.Name} />
                {product.InStock && getPrice()}
                {(() => {
                    if(product.InStock) {
                        return (
                            <div className='BuyAddToCartContainer'>
                            <button className="AddToCart" onClick={() => addToCart(product.Name)}>Add to Cart</button>
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

    );
}

export default Product;