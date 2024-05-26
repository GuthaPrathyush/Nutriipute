import { Link, useParams } from 'react-router-dom';
import { WebsiteContext } from '../Contexts/WebsiteContext';
import { useContext } from 'react';
import '../stylesheets/search.css';
import ItemHorizontal from './ItemHorizontal';

function Search() {
    let {searchText} = useParams();
    const {AllProducts} = useContext(WebsiteContext);
    searchText = String(searchText).toLowerCase();
    searchText = searchText.split('_');
    let itemsPresent = false;
    return (
        <div className="Search">
            <div className="container">
                <div className="searchedProducts">
                    {AllProducts.map((item, index) => {
                        for(let searchItem of searchText) {
                            if(item.Name.toLowerCase().indexOf(searchItem) !== -1) {
                                itemsPresent = true;
                                return (
                                    <ItemHorizontal key={index} items={item}/>
                                );
                            }
                            else if(item.Domain.toLowerCase().indexOf(searchItem) !== -1) {
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

export default Search;