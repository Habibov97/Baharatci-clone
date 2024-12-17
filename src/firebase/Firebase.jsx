import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyA05kw0ikyKkdx-B6du28Fqqxh-VvyZNYM",
  authDomain: "fir-baharatci.firebaseapp.com",
  projectId: "fir-baharatci",
  storageBucket: "fir-baharatci.appspot.com",
  messagingSenderId: "169256641207",
  appId: "1:169256641207:web:72df780f00be799ad02332"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);