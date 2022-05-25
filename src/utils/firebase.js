import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAE90wnP3VI355B-0B4n9A3FBSq93mKJhI",
  authDomain: "restoapp-cf075.firebaseapp.com",
  projectId: "restoapp-cf075",
  storageBucket: "restoapp-cf075.appspot.com",
  messagingSenderId: "825993997938",
  appId: "1:825993997938:web:6e97430f6e9f1fdb089ceb"
};

export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore()