import { Link, useNavigate, useParams } from 'react-router-dom';
import { WebsiteContext } from '../Contexts/WebsiteContext';
import { useContext, useEffect } from 'react';
import '../stylesheets/search.css';
import ItemHorizontal from './ItemHorizontal';

function Search() {
    let {searchText} = useParams();
    const navigate = useNavigate();
    const {AllProducts} = useContext(WebsiteContext);
    searchText = String(searchText).toLowerCase();
    searchText = searchText.split('_');
    let itemsPresent = false;
    useEffect(() => {
        if(AllProducts.length === 0) {
            navigate('/');
        }
    });
    if(AllProducts.length !== 0) {
        return (
            <div className="Search">
                <div className="container">
                    <div className="searchedProducts">
                        {AllProducts.map((item, index) => {
                            for(let searchItem of searchText) {
                                if(String(item.Name).toLowerCase().indexOf(searchItem) !== -1) {
                                    itemsPresent = true;
                                    return (
                                        <ItemHorizontal key={index} items={item}/>
                                    );
                                }
                                else if(String(item.Section).toLowerCase().indexOf(searchItem) !== -1) {
                                    itemsPresent = true;
                                    return (
                                        <ItemHorizontal key={index} items={item}/>
                                    );
                                }
                            }

                        })}
                        {(() => {
                            if(!itemsPresent) {
                                return (
                                    <Link className='noProducts' to='/menu'>
                                    <div><h2>No Products :(</h2><p>click to go to Menu</p></div>
                                    </Link>
                                );
                            }
                        })()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;