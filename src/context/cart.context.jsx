import { createContext,useEffect,useState } from "react";

const addCartItem = (cartItems, product) => {
    const existingCart = cartItems.find((cartItem) => cartItem.id === product.id);

    if(existingCart) {
        return cartItems.map((cartItem) => cartItem.id === product.id ? {...cartItem,quantity: cartItem.quantity + 1} : cartItem)
    }
    // else {
    //     return cartItems.map((cartItem) => cartItem.id === product.id ? {...cartItem,quantity: cartItem.quantity - 1} : cartItem);
    // }

    return [...cartItems,{...product,quantity:1}];
}

const deleteCartItem = (cartItems,product) => {

    const newCartItem = cartItems.find((cartItem) => cartItem.id === product.id);

    if(newCartItem.quantity === 1) return cartItems.filter(cartItem => cartItem.id !== product.id);

    if(newCartItem && newCartItem.quantity > 0) {
        return cartItems.map((cartItem) => cartItem.id === product.id ? {...cartItem,quantity:cartItem.quantity - 1} : cartItem);
    }

    return [...cartItems];
    
}
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems:[],
    addItemToCart: () => {},
    deleteItemToCart: () => {},
    cartCount: 0,
})



export const CartProvider = ({children}) => {
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [cartCount,setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total,cartItem) => total + cartItem.quantity ,0);
        setCartCount(newCartCount);
    },[cartItems])

    const addItemToCart = (product) => {
        setCartItems(addCartItem(cartItems,product));
    }

    const deleteItemToCart = (product) => {
        setCartItems(deleteCartItem(cartItems,product));
    }
    const value = {isCartOpen,setIsCartOpen,addItemToCart,deleteItemToCart,cartItems,cartCount}
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}