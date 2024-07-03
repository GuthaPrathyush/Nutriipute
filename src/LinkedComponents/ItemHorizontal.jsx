import '../stylesheets/itemHorizontal.css';
import {Link} from 'react-router-dom';
import { WebsiteContext } from '../Contexts/WebsiteContext';
import { useContext } from 'react';
import {toast} from 'react-hot-toast';

function ItemHorizontal(props) {
    const item = props.items;
    const {addToCart} = useContext(WebsiteContext);
    function getPrice() {
        if(Number(Number(item.Offer) > 0 && Number(item.Offer) < Number(item.Price))) {
            return (
                <p><sup><del>₹{item.Price}</del></sup> <strong>₹{item.Offer}</strong></p>
            );
        }
        else {
            return (
                <p><strong>₹{item.Price}</strong></p>
            );
        }
    }
    return (
        <div className="itemHorizontal">
            <Link onClick={() => scrollTo(0,0)} to={`/${item.product_id}`}>
                <img src={item.Image} alt="" />
            </Link>
            <div className="itemDetails">
                <h1>{item.Name}</h1>
                <p className='Description'>{item.Description}</p>
                <div>
                    {item.InStock && getPrice()}
                    {(() => {
                        if(item.InStock) {
                            return (
                                <button type='button' onClick={(e) => {e.preventDefault();addToCart(item.product_id);toast.success("Added to Cart!", {position: "top-right", style: {position: "relative", top: "70px", right: "5px"}})}}>Add to Cart</button>
                            );
                        }
                        else {
                            return(
                                <div className="outOfStock">
                                    <p>This Product is Currently Unavailable!</p>
                                </div>
                            );
                        }
                    })()}
                </div>
            </div>
        </div>
    );
}

export default ItemHorizontal;