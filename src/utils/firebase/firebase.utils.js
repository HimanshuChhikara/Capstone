import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
 } from 'firebase/auth';

 import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection
 } from 'firebase/firestore'

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

const googleProvider = new GoogleAuthProvider(); // Set google auth provider class 
googleProvider.setCustomParameters({               // this will take objects
    prompt:"select_account"   // whenever someone enter app we need to select acoount
})

export const auth = getAuth();  
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider)
// auth is a singleton where as provider is a class

export const signInGoogleWithRedirect= () => signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef , {
                displayName,
                email,
                createdAt
            });
        }
        catch(err) {
            console.log("Error while creating a user" , err);
        }
    }
    return userDocRef;
};