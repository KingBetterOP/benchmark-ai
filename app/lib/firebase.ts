import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1X5LmfGdmtwkU6w0yEr6UF_xiwbGEe50",
  authDomain: "benchmark-ai-43432.firebaseapp.com",
  projectId: "benchmark-ai-43432",
  storageBucket: "benchmark-ai-43432.firebasestorage.app",
  messagingSenderId: "856499478556",
  appId: "1:856499478556:web:4025d7e9ccd56c1e453fd9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);