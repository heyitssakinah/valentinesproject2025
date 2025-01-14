// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWsjelN-nK5Bf_13-0KToPjzxmRySg1hI",
  authDomain: "valentines-project-b2201.firebaseapp.com",
  databaseURL: "https://valentines-project-b2201-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "valentines-project-b2201",
  storageBucket: "valentines-project-b2201.firebasestorage.app",
  messagingSenderId: "220673749238",
  appId: "1:220673749238:web:b5b56bdbf441e452dafcd7",
  measurementId: "G-NNPZMNVEES",
};

  //iniitalise firebase and get database 
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)


  export {app, auth};
