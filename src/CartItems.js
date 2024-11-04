import { createContext, useContext, useState } from 'react';

// Create the CartContext
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
    return useContext(CartContext);
};

// Provider component to wrap the application and provide cart state
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    // Function to add an item to the cart
    const handleAddToCart = (item) => {
        if(!cartItems.some(cartItem => cartItem.identifier === item.identifier)) setCartItems((prevCartItems) => [...prevCartItems, item]);
    };

    // Function to remove an item from the cart
    const handleRemoveFromCart = (item) => {
        setCartItems((prevCartItems) =>
            prevCartItems.filter((cartItem) => cartItem.identifier !== item.identifier)
        );
    };

    // Provide the cart items, add function, and remove function to any component that uses this context
    return (
        <CartContext.Provider value={{ cartItems, handleAddToCart, handleRemoveFromCart }}>
            {children}
        </CartContext.Provider>
    );
}
