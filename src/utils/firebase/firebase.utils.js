import { initializeApp } from 'firebase/app';
import {
  getAuth,
  // eslint-disable-next-line no-unused-vars
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDo0okqUxNSJqtwtrVVzz2GgOirL6yVLy8",
  authDomain: "e-clothing-db-ab0e6.firebaseapp.com",
  projectId: "e-clothing-db-ab0e6",
  storageBucket: "e-clothing-db-ab0e6.appspot.com",
  messagingSenderId: "1026114043152",
  appId: "1:1026114043152:web:2c80805c7c92876a1fb995"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
