import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
  } from '../../utils/firebase/firebase.utils';
  
// import Authentication from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignupForm from '../../components/sign-up-form/sign-up-form.component';
import '../authentication/authentication.styles.scss'
  
  const Authentication = () => {
    const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
    };
  
    return (
      <div className='authentication-conatiner'>
        <SignInForm />
        <SignupForm />
        {/* <Authentication /> */}
      </div>
    );
  };
  
export default Authentication;