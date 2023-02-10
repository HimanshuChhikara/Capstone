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

const clearCartItem = (cartItems,product) => {
    return cartItems.filter((cartItem) => cartItem.id !== product.id)
    
}

const cartTotalCalculate = (cartItems) => {
    let total = 0;
    let singleItem = 0
    cartItems.map((cartItem) => {
        singleItem = parseInt(cartItem.quantity) * parseInt(cartItem.price); 
        total = total + singleItem;
    })
    return total
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems:[],
    addItemToCart: () => {},
    deleteItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal:0,
    calculateCartTotal: () => {},
})



export const CartProvider = ({children}) => {
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [cartCount,setCartCount] = useState(0);
    const [cartTotal,setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total,cartItem) => total + cartItem.quantity ,0);
        setCartCount(newCartCount);
    },[cartItems])

    
    useEffect(() => {
        const finalTotal = cartTotalCalculate(cartItems);
        setCartTotal(finalTotal);
    },[cartItems])

    const addItemToCart = (product) => {
        setCartItems(addCartItem(cartItems,product));
    }

    const deleteItemToCart = (product) => {
        setCartItems(deleteCartItem(cartItems,product));
    }

    const clearItemFromCart = (product) => {
        setCartItems(clearCartItem(cartItems,product));
    }

    const calculateCartTotal = () => {
        setCartTotal(cartTotal(cartItems));
    }
    const value = {isCartOpen,setIsCartOpen,addItemToCart,deleteItemToCart,clearItemFromCart,cartItems,cartCount,cartTotal,calculateCartTotal}
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}