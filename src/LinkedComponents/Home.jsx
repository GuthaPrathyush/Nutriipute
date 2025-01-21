import '../stylesheets/home.css';
import { WebsiteContext } from "../Contexts/WebsiteContext";
import { useContext, useState, useMemo } from "react";
import ItemHorizontal from './ItemHorizontal';
import { Link } from 'react-router-dom';

function Home() {
    const { AllProducts } = useContext(WebsiteContext);
    const AllProductsShuffled = useMemo(() => {
        return shuffleArray([...AllProducts]);
    }, [AllProducts]);
    const renderItems = (products, isVeg) => {
        let countForVeg = 0;
        return products.map((item, index) => {
            if ((isVeg && item.Veg && countForVeg < 3) || (!isVeg && !item.Veg && countForVeg < 3)) {
                countForVeg++;
                return <ItemHorizontal key={index} items={item}/>;
            }
        });
    };

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    return (
        <div className="Home">
            <div className="container">
                <div className="Veg">
                    <div className='heading'>Vegetarian <div><div></div></div></div>
                    {renderItems(AllProductsShuffled, true)}
                    <Link to='/menu' className='checkoutBtn' onClick={() => window.scrollTo(0, 0)}>Check Out More</Link>
                    <hr />
                </div>
                <div className="NonVeg">
                    <div className='heading'>Non-Vegetarian <div><div></div></div></div>
                    {renderItems(AllProductsShuffled, false)}
                    <Link className='checkoutBtn' to='/menu' onClick={() => window.scrollTo(0, 0)}>Check Out More</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
