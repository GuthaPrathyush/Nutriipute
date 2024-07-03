import NavigationBar from "./LinkedComponents/NavigationBar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './LinkedComponents/Home.jsx';
import About from './LinkedComponents/About.jsx';
import Menu from './LinkedComponents/Menu.jsx';
import Help from './LinkedComponents/Help.jsx';
import Orders from './LinkedComponents/Orders.jsx'
import Cart from './LinkedComponents/Cart.jsx'
import Error from './LinkedComponents/Error.jsx';
import Product from './LinkedComponents/Product.jsx';
import Footer from "./LinkedComponents/Footer.jsx";
import Register from "./LinkedComponents/Register.jsx";
import Contact from "./LinkedComponents/Contact.jsx";
import Search from "./LinkedComponents/Search.jsx";
import Login from "./LinkedComponents/Login.jsx";
import Profile from "./LinkedComponents/Profile.jsx";
import Checkout from "./LinkedComponents/Checkout.jsx";
import AddAddress from "./LinkedComponents/AddAddress.jsx";
import EditAddress from './LinkedComponents/EditAddress.jsx';
import {Toaster} from 'react-hot-toast';
import axios from "axios";
import { useContext } from "react";
import { WebsiteContext } from "./Contexts/WebsiteContext.jsx";
import { ClipLoader } from "react-spinners";

axios.defaults.withCredentials = true;

function App() {
    const {loaded} = useContext(WebsiteContext);
    if(!loaded) {
        return(
            <div className="Home">
                <div className="container" style={{flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                    <ClipLoader/>
                </div>
            </div>
        );
    }
    return (
        <>
            <Toaster position="bottom-center"/>
            <BrowserRouter>
            <NavigationBar/>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/about' element={<About/>}></Route>
                <Route path='/Menu' element={<Menu/>}></Route>
                <Route path='/Help' element={<Help/>}></Route>
                <Route path='/Orders' element={<Orders/>}></Route>
                <Route path='/Register' element={<Register/>}></Route>
                <Route path='/Cart' element={<Cart/>}></Route>
                <Route path='/Contact' element={<Contact />}></Route>
                <Route path='/Login' element={<Login/>}></Route>
                <Route path='/Register' element={<Register/>}></Route>
                <Route path='/Profile' element={<Profile />}></Route>
                <Route path='/Checkout' element={<Checkout/>}></Route>
                <Route path='/addAddress' element={<AddAddress/>}></Route>
                <Route path='/editAddress' element={<EditAddress/>}></Route>
                <Route path='/:product_id' element={<Product/>}></Route>
                <Route path='/Search'>
                    <Route path=':searchText' element={<Search></Search>}></Route>
                </Route>
                {/* <Route path='/Salads'>
                    <Route path=':productName' element={<Product page="1"/>} />
                </Route>
                <Route path='/BrownRiceBowls'>
                    <Route path=':productName' element={<Product page="2"/>} />
                </Route>
                <Route path='/ProtienStarters'>
                    <Route path=':productName' element={<Product page="3"/>} />
                </Route> */}
                <Route path='/*' element={<Error/>}></Route>
            </Routes>
            <Footer></Footer>
            </BrowserRouter>
        </>
    );
}

export default App
