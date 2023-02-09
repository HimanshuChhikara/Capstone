import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';


const CheckOut = () => {
    const { cartItems,addItemToCart,deleteItemToCart} = useContext(CartContext);
    return (
        <div>
            <h1>This is Checkout Page</h1>
            <div>{
                cartItems.map((cartItem) => {
                    const {name,quantity,id} = cartItem
                    return (
                        <div key={id}>
                            <h2>{name}</h2>
                            <span>{quantity}</span>
                            <br />
                            <span onClick={() => deleteItemToCart(cartItem)}>Decrement</span>
                            <br  />
                            <span onClick={() => addItemToCart(cartItem)}>Increment</span>
                        </div>
                    )

                })
            }
            </div>
        </div>
    )
}

export default CheckOut;