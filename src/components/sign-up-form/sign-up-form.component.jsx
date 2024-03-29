import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

const defaultFormFields = {
    displayName : '',
    email : '',
    password: '',
    confirmPassword : ''
}
const SignupForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName , email, password, confirmPassword} = formFields;

    const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = async() => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async(event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("Password do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, {displayName});
            setCurrentUser(user);
            resetFormFields();

        }
        catch(err) {
            if(err.code === 'auth/email-already-in-use') {
                 alert('Email Already Exist');
            }
            if(err.code === 'auth/weak-password') {
                alert('Password should be at least 6 characters')
            }
            console.log("Error in register email" ,err);
        }
        console.log("Default Form Fields -- ",defaultFormFields)    
    }

    const handleChange = (event) => {
        const { name,value} = event.target;
        setFormFields({ ...formFields , [name] : value })
    } 
    return (
        <div className="sign-up-container">
            <h2>Don't have an account ?</h2>
            <span>Signup with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label= "Display Name" type= "text" required onChange={handleChange} name= "displayName" value= {displayName}/>
                <FormInput label="Email" type="email" required onChange={handleChange} name= "email" value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name= "password" value={password}/>
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name= "confirmPassword" value={confirmPassword}/>
                <Button type="submit" >Sign Up</Button>
            </form>
        </div>
    )
}

export default SignupForm;