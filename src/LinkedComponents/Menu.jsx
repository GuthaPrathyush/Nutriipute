import '../stylesheets/menu.css';
import { useContext } from 'react';
import { WebsiteContext } from '../Contexts/WebsiteContext.jsx';
import Section from './Section.jsx';

function Menu() {
    const {AllProductsMulti} = useContext(WebsiteContext);
    return (
        <div className="Menu">
            <div className="container">
                {AllProductsMulti.map((item, i) => {
                    return (
                        <Section key={i} products={item} index={i} length={AllProductsMulti.length} />
                    )
                })}
                {/* <div className='menuDomain'>
                    <h1>Breakfasts</h1>
                    <div className='menuContainer'>
                        {Breakfast.map((item, i) => {
                            return <Link key={i} to={`/${item.product_id}`}><Item items={item}/></Link>
                        })}
                    </div>
                    <hr />
                </div>
                <div className='menuDomain'>
                    <h1>Salads</h1>
                    <div className='menuContainer'>
                        {Salads.map((item, i) => {
                            return <Link key={i} to={`/${item.Domain}/${item.Name.replace(/ /g, '_')}`}><Item items={item}/></Link>
                        })}
                    </div>
                    <hr />
                </div>
                <div className='menuDomain'>
                    <h1>Brown Rice Bowls</h1>
                    <div className='menuContainer'>
                        {BrownRiceBowls.map((item, i) => {
                            return <Link key={i} to={`/${item.Domain}/${item.Name.replace(/ /g, '_')}`}><Item items={item}/></Link>
                        })}
                    </div>
                    <hr />
                </div>
                <div className='menuDomain'>
                    <h1>Protien Starters</h1>
                    <div className='menuContainer'>
                        {ProtienStarters.map((item, i) => {
                            return <Link key={i} to={`/${item.Domain}/${item.Name.replace(/ /g, '_')}`}><Item items={item}/></Link>
                        })}
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Menu;