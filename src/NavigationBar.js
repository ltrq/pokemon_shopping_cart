import logo from './assets/Rocket_Logo.PNG'; // Import the logo
import './Home.css';
import { Link } from 'react-router-dom';
import {useCart} from './CartItems';


function NavigationBar(){
    const {cartItems} = useCart();

    return(
        <div className="Navigation_Bar">
                <img src={logo} alt="Logo" className="Logo" />
                <div className="NavLinks">
                    <div className='NavLinks_Home'><Link to="/">Home</Link></div>
                    <div className='NavLinks_Collection'><a href="#collection">Collection</a></div>
                    <div className='NavLinks_About'><Link to="/about-us">About Us</Link></div>
                    <div className='NavLinks_Store'><Link to="/store">Store</Link></div>
                    <div className='NavLinks_Cart'><Link to="/cart">
                            Cart 
                            {cartItems.length>0&&<span className="Cart_Item_Count">{cartItems.length}</span>}
                        </Link></div>
                    <div className='NavLinks_Login'><a href="#login">Login</a></div>
                </div>
            </div>
    );
};

export default NavigationBar;