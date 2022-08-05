import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
const signIn = () => { 

    const logGoogleUser = async() => {
        const {user} = await signInWithGooglePopup();
        const userdocRef = await createUserDocumentFromAuth(user);
    }
    return(
        <div>
            <h1> This is Signin page</h1>
            <button onClick={logGoogleUser}>
                SignIn with Google
            </button>
        </div>
    )
}

export default signIn;