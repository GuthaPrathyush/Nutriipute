import oatMeal from './Images/Breakfast/oatMeal.jpg';
import breadOmlette from './Images/Breakfast/breadOmlette.jpg';
import ragiMalt from './Images/Breakfast/ragiMalt.webp';

const Breakfast = [
    {
        Name: "Oat Meal",
        Price: "79",
        Offer: "50",
        Image: oatMeal,
        Description: "Start your day right with our wholesome oatmeal, a breakfast classic packed with nourishing goodness. Made from the finest quality rolled oats, our oatmeal is a hearty and satisfying option for those seeking a nutritious morning meal. Each bowl is a comforting blend of tender oats cooked to perfection, served piping hot and ready to fuel your day.",
        Macro: {
            calories: 10,
            protien: 40
        },
        Veg: true,
        InStock: true,
        Domain: "Breakfasts"
    },
    {
        Name: "Bread Omlette",
        Price: "79",
        Offer: "0",
        Image: breadOmlette,
        Description: "Made up of Eggs and Bread fried on pan using delicious ghee",
        Macro: {
            calories: 10,
            protien: 40
        },
        Veg: false,
        InStock: false,
        Domain: "Breakfasts"
    },
    {
        Name: "Ragi Malt",
        Price: "79",
        Offer: "0",
        Image: ragiMalt,
        Description: "something delicious",
        Macro: {
            Calories: 10,
            Protien: 40
        },
        Veg: true,
        InStock: true,
        Domain: "Breakfasts"
    }
];

export default Breakfast;