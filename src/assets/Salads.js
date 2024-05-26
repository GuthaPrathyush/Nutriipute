import chickenSalad from './Images/Salads/chickenSalad.jpg';
import eggWhiteSalad from './Images/Salads/eggWhiteSalad.jpg';
import paneerSalad from './Images/Salads/paneerSalad.jpg';
import vegetableSalad from './Images/Salads/vegetableSalad.jpg';
import fruitSalad from './Images/Salads/fruitSalad.jpg';

const Salads = [
    {
        Name: "Chicken Salad",
        Price: "139",
        Offer: "0",
        Image: chickenSalad,
        Description: "something delicious",
        Macro: {
            calories: 10,
            protien: 40
        },
        Veg: false,
        InStock: true,
        Domain: "Salads"
    },
    {
        Name: "Egg White Salad",
        Price: "139",
        Offer: "0",
        Image: eggWhiteSalad,
        Description: "something delicious",
        Macro: {
            calories: 10,
            protien: 40
        },
        Veg: false,
        InStock: true,
        Domain: "Salads"
    },
    {
        Name: "Paneer Salad",
        Price: "139",
        Offer: "0",
        Image: paneerSalad,
        Description: "something delicious",
        Macro: {
            calories: 10,
            protien: 40
        },
        Veg: true,
        InStock: true,
        Domain: "Salads"
    },
    {
        Name: "Vegetable Salad",
        Price: "119",
        Offer: "0",
        Image: vegetableSalad,
        Description: "something delicious",
        Macro: {
            calories: 10,
            protien: 40
        },
        Veg: true,
        InStock: true,
        Domain: "Salads"
    },
    {
        Name: "Fruit Salad",
        Price: "199",
        Offer: "0",
        Image: fruitSalad,
        Description: "something delicious",
        Macro: {
            calories: 10,
            protien: 40
        },
        Veg: true,
        InStock: true,
        Domain: "Salads"
    }
];

export default Salads;