import React, { useEffect, useState } from 'react';
import { useCart } from './CartItems'; // Import the custom useCart hook
import NavigationBar from './NavigationBar';
import './Cart.css'; // Ensure this is the correct path based on your project structure
import { Link } from 'react-router-dom';


// Component to display and manage cart items
function Cart() {
    const { cartItems, handleRemoveFromCart } = useCart(); // Access cart items and remove function
    const [total, setTotal] = useState(0);

    // Calculate total price whenever cartItems change
    useEffect(() => {
        const newTotal = cartItems.reduce((total, item) => total + item.unformattedPrice, 0);
        setTotal(newTotal);
    }, [cartItems]); // Depend on cartItems to recalculate when items are added or removed

    // Function to format the total price
    const formatTotalPrice = () => {
        return total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    };

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleCheckout = () => {
        alert('Checkout successful! Thank you for your purchase!');
        // setTotal(0);
        // cartItems.forEach((item) => handleRemoveFromCart(item));
    };

    return (
        <div className="Cart_Container">
            <NavigationBar />
            <h2 className="Cart_Title">Item{cartItems.length === 1 ? "" : "s"} in Cart: {cartItems.length}</h2>
            <div className="Cart" style={{ marginTop: '200px' }}>
                {cartItems.map((item, index) => ( // Use a unique identifier for the key
                    <div key={item.identifier} className="Cart_Item"> {/* Ensure the key is unique */}
                        <p className="Cart_Item_Number">{index + 1}   </p>
                        <img className="Cart_Item_Image" src={item.image} alt={item.name} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div className="Cart_Item_Name">{item.isShiny ? 'Shiny ' : ''}{capitalizeFirstLetter(item.name)}</div>
                            <div className="Cart_Item_Price">{item.price}</div>
                        </div>
                        <button className="Cart_Item_Remove_Button" onClick={() => handleRemoveFromCart(item)}>Remove</button>
                    </div>
                ))}

                <div className='Cart_Total'>
                    <p className="Cart_Total_Text">Total: {formatTotalPrice()}</p> {/* Call the function to display formatted price */}
                    {cartItems.length > 0 && <button className='Cart_Purchase_Button'
                        onClick={handleCheckout}>
                        Purchase
                    </button>}
                </div>
                
            </div>
            {cartItems.length === 0 && (
                <button className="return-to-store-button">
                    <Link to="/store">Return to Store</Link>
                </button>
            )}
        </div>
    );
}

export default Cart;
