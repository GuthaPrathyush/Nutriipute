import chickenFajitas from './Images/ProtienStarters/chickenFajitas.webp';
import grilledLemonChicken from './Images/ProtienStarters/grilledLemonChicken.webp';

const ProtienStarters = [
    {
        Name: "Chicken Fajitas",
        Price: "149",
        Offer: "0",
        Image: chickenFajitas,
        Description: "something delicious",
        Macro: {
            calories: 10,
            proteins: 40
        },
        Veg: false,
        InStock: true,
        Domain: "ProtienStarters"
    },
    {
        Name: "Grilled Lemon Chicken",
        Price: "149",
        Offer: "0",
        Image: grilledLemonChicken,
        Description: "something delicious",
        Macro: {
            calories: 10,
            proteins: 40
        },
        Veg: false,
        InStock: true,
        Domain: "ProtienStarters"
    }
];

export default ProtienStarters;