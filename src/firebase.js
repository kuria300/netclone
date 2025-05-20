import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {addDoc, collection, getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "netclone-e9c99.firebaseapp.com",
  projectId: "netclone-e9c99",
  storageBucket: "netclone-e9c99.firebasestorage.app",
  messagingSenderId: "778386261727",
  appId: "1:778386261727:web:a03d8de445fe1ae54ccb6a"
};

// Initialize Firebase connects your app to firebase 
const app = initializeApp(firebaseConfig);
//gets firebase auth service for this project thats why we call app in getAuth function
const auth= getAuth(app);
const db= getFirestore(app);

const signup=async (name, email, password)=>{
try{
  const res= await createUserWithEmailAndPassword(auth, email, password);
  const user= res.user;
  await addDoc(collection(db, 'users'),{
    uid:user.uid,
    name,
    email: user.email,
    authProvider:'local',
    createdAt: new Date()
  })
}catch(err){
  console.error(err)
  toast.error(err.code.split('/')[1].split('-').join(' '))
}
}
const login = async(email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password)

    }catch(err){
        console.log('Error', err)
        toast.error(err.code.split('/')[1].split('-').join(' '))
    }
}
const logout=()=>{
    signOut(auth)
}

export {auth, db, signup, login, logout}