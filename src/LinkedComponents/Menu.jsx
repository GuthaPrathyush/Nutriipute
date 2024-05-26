import { Link } from 'react-router-dom'
import Breakfast from '../assets/Breakfast.js';
import Salads from '../assets/Salads.js';
import BrownRiceBowls from '../assets/BrownRiceBowls.js';
import ProtienStarters from '../assets/ProtienStarters.js';
import Item from './Item';
import '../stylesheets/menu.css';

function Menu() {
    return (
        <div className="Menu">
            <div className="container">
                <div className='menuDomain'>
                    <h1>Breakfasts</h1>
                    <div className='menuContainer'>
                        {Breakfast.map((item, i) => {
                            return <Link key={i} to={`/${item.Domain}/${item.Name.replace(/ /g, '_')}`}><Item items={item}/></Link>
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
                </div>
            </div>
        </div>
    );
}

export default Menu;