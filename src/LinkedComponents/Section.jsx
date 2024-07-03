import Item from './Item';
import '../stylesheets/menu.css';
import { Link } from 'react-router-dom';

function Section(props) {
    const {products, index, length} = props;
    return (
        <div className="menuDomain">
            <h1>{products[0].Section}</h1>
            <div className="menuContainer">
                {products.map((item, i) => {
                    return <Link key={i} to={`/${item.product_id}`}><Item items={item}/></Link>
                })}
            </div>
            {index !== length-1? <hr />: null}
        </div>
    );
}

export default Section;