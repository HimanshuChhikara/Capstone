import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils';

const signIn = () => { 

    const logGoogleUser = async() => {
        const response = await signInWithGooglePopup();
        console.log(response);
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