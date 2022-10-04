import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email : '',
    password: '',
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

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
          
            resetFormFields();

        }
        catch(err) {
           
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
                <Button buttonType='google-sign-in'onClick={signInWithGoogle} >Sign In With Google</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;