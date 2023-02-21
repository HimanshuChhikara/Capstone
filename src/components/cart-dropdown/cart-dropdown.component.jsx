import './cart-dropdown.styles.scss'
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { useNavigate } from 'react-router-dom';


const CartDropdown = () => {
    const { cartItems,isCartOpen,setIsCartOpen} = useContext(CartContext);
    const navigate = useNavigate();
    
    const goToCheckoutHandler = () => {
        setIsCartOpen(!isCartOpen)
        navigate('/checkout')
    }
    return(
        <div className='cart-dropdown-container'>
            {/* <div className='cart-items' /> */}
            <div className='cart-items'>
            {cartItems.map((item) => <CartItem key={item.id} cartItem={item}/>)} 
            <Button onClick={goToCheckoutHandler}>Go To CheckOut</Button>
         
            </div>
        </div>
    )
}

export default CartDropdown;