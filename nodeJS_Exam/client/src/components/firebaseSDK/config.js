import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {

  apiKey: "AIzaSyCJGHgCIMB0Dgou6sEYapqSt33qHPXqLGw",

  authDomain: "mymisc-16866.firebaseapp.com",

  projectId: "mymisc-16866",

  storageBucket: "mymisc-16866.appspot.com",

  messagingSenderId: "1079602820851",

  appId: "1:1079602820851:web:073a5e2cc3002f68902986"

};



const app = initializeApp(firebaseConfig);

const storage = getStorage(app)

export {app, storage}