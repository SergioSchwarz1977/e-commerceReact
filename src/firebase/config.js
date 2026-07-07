import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJt4Qat_Gripu82AGRXGh_GPuTZH4VWtk",
  authDomain: "e-commerce-react-8c21a.firebaseapp.com",
  projectId: "e-commerce-react-8c21a",
  storageBucket: "e-commerce-react-8c21a.firebasestorage.app",
  messagingSenderId: "966988609959",
  appId: "1:966988609959:web:a1079470bfc95fb19a5e82"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
