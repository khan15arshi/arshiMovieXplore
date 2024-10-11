
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBKjpZcX7BOqzN5_D5xEwJJl1h_-2AK00A",
  authDomain: "nettflix-b9c39.firebaseapp.com",
  projectId: "nettflix-b9c39",
  storageBucket: "nettflix-b9c39.appspot.com",
  messagingSenderId: "489800767534",
  appId: "1:489800767534:web:339cfcd2369c94774367bf"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db = getFirestore(app);

const signup= async (name, email, password)=>{
    try{
       const res= await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db, "user"),{
        uid: user.uid,
        authProvider:"local",
        email,
         });
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        }
    }
    const login =async(email, password)=>{
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error);
            toast.error(error.code.split('/')[1].split('-').join(" "));
        }

    }
    const logout =()=>{
        signOut(auth);
    }
    export{auth, db, login, signup, logout};
