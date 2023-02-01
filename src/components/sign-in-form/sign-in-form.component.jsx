import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../context/user.context";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup,signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss';
import { useContext } from "react";

const defaultFormFields = {
    email : '',
    password: '',
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const { setCurrentUser } = useContext(UserContext);
    const resetFormFields = async() => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };
    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user)
            resetFormFields();

        }
        catch(err) {
            if(err.code === 'auth/wrong-password') {
                alert("Incorrect password for email");
            }
            if(err.code === 'auth/user-not-found') {
                alert("Email doesn't exist");
            }
           console.log(err);    
        }
    }

    const handleChange = (event) => {
        const { name,value} = event.target;
        setFormFields({ ...formFields , [name] : value })
    } 
    return (
        <div className="sign-up-container">
            <h2>Already have an account ?</h2>
            <span>Signup with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name= "email" value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name= "password" value={password}/>
                <div className="buttons-container">
                <Button type='submit'>Sign In</Button>
                <Button type='button' buttonType='google-sign-in'onClick={signInWithGoogle} >Google SignIn</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;