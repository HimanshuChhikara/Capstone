import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};