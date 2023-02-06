import { Fragment,useContext } from 'react';
import { Outlet, Link} from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import { ReactComponent as CrownLogo } from '../../assets/083 crown.svg';
import {signOutUser} from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../context/cart.context';

import './navigation.styles.scss';

const Navigation = () => {
  const {currentUser,setCurrentUser} = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext)
  const signOutHandler = async() => {
    const res = await signOutUser();

    console.log("Res -== ",res)
    setCurrentUser(null);
  }
    return (
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrownLogo className='Logo'/>
            </Link>
            <div className='nav-links-container'>
            <Link className='nav-link' to = '/shop'>Shop</Link>
            {
              currentUser ? (
                <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
                ): (
                  <Link className='nav-link' to = '/auth'>SIGN IN</Link>
                )
            }
            <CartIcon />
            </div>
            {isCartOpen && <CartDropdown /> }
        </div> 
        <Outlet />
      </Fragment>
    )
}

export default Navigation;