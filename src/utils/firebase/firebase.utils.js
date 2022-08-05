import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
 } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBzou7nVkpDVnH_-XnflNsaFyRvxOyHMyQ",
    authDomain: "crwn-clothing-db-a94ef.firebaseapp.com",
    projectId: "crwn-clothing-db-a94ef",
    storageBucket: "crwn-clothing-db-a94ef.appspot.com",
    messagingSenderId: "924163860388",
    appId: "1:924163860388:web:cb9fdd1470f381ba914331",
    measurementId: "G-5DEZPMKJ2Z"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); // Set google auth provider class 
provider.setCustomParameters({               // this will take objects
    prompt:"select_account"   // whenever someone enter app we need to select acoount
})

export const auth = getAuth();  
export const signInWithGooglePopup = () => signInWithPopup(auth,provider)


// auth is a singleton where as provider is a class