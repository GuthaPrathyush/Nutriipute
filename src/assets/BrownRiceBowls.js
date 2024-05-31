import eggBowl from './Images/BrownRiceBowls/eggBowl.jpg';
import chickenBowl from './Images/BrownRiceBowls/chickenBowl.jpg';
import paneerBowl from './Images/BrownRiceBowls/paneerBowl.jpg';
import rajmaBowl from './Images/BrownRiceBowls/rajmaBowl.jpg';

const BrownRiceBowls = [
    {
        Name: "Egg Bowl",
        Price: "129",
        Offer: "0",
        Image: eggBowl,
        Description: "something delicious",
        Macro: {
            calories: 10,
            proteins: 40
        },
        Veg: false,
        InStock: true,
        Domain: "BrownRiceBowls"
    },
    {
        Name: "Chicken Bowl",
        Price: "139",
        Offer: "0",
        Image: chickenBowl,
        Description: "something delicious",
        Macro: {
            calories: 10,
            proteins: 40
        },
        Veg: false,
        InStock: true,
        Domain: "BrownRiceBowls"
    },
    {
        Name: "Paneer Bowl",
        Price: "139",
        Offer: "0",
        Image: paneerBowl,
        Description: "something delicious",
        Macro: {
            calories: 10,
            proteins: 40
        },
        Veg: true,
        InStock: true,
        Domain: "BrownRiceBowls"
    },
    {
        Name: "Rajma Bowl",
        Price: "139",
        Offer: "0",
        Image: rajmaBowl,
        Description: "something delicious",
        Macro: {
            calories: 10,
            proteins: 40
        },
        Veg: true,
        InStock: true,
        Domain: "BrownRiceBowls"
    }
]

export default BrownRiceBowls;