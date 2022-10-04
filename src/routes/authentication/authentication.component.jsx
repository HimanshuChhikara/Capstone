import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
  } from '../../utils/firebase/firebase.utils';
  
// import Authentication from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignupForm from '../../components/sign-up-form/sign-up-form.component';
  
  const Authentication = () => {
    const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
    };
  
    return (
      <div>
        <h1>Sign In Page</h1>
        <SignInForm />
        <SignupForm />
        {/* <Authentication /> */}
      </div>
    );
  };
  
export default Authentication;