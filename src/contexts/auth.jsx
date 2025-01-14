import { auth } from "../configuration";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithPhoneNumber,
  } from "firebase/auth";


export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(email, password);
};

// const appVerifier = window.recaptchaVerifier;

// export const doSignInWithPhoneNumber = async (phoneNumber) => {
//     return signInWithPhoneNumber(auth, phoneNumber, appVerifier) 
//     .then((confirmationResult) => { window.confirmationResult = confirmationResult;
//     }).catch((error) => {
//         console.log(error);
//         grecaptcha.reset(window.recaptchaWidgetId);
//     })
// };

// const code = getCodeFromUserInput();
// confirmationResult.confirm(code).then((result) => {
//     const user = result.user;
// }).catch((error) => { console.log(error); });



export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = signInWithPopup(auth, provider);
    // result.use
    return result;

}

export const doSignOut = async () => {
    return auth.signOut(auth);
};