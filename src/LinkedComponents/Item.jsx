import '../stylesheets/item.css'
function Item(props) {
    let Items = props.items;
    function getPrice() {
        if(Number(Number(Items.Offer) > 0 && Number(Items.Offer) < Number(Items.Price))) {
            return (
                <p><sup><del>₹{Items.Price}</del></sup> <strong>₹{Items.Offer}</strong></p>
            );
        }
        else {
            return (
                <p><strong>₹{Items.Price}</strong></p>
            );
        }
    }
    return (
        <div onClick={() => window.scrollTo(0, 0)} className="Item">
            <img src={Items.Image} alt={Items.Name} />
            <h2>{Items.Name}</h2>
            {getPrice()}
        </div>
    );
}

export default Item;