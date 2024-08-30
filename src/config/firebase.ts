// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBjvAX6gBLrmF-13TobFOYTAb81F-oyCnU",
	authDomain: "date-rate-f54ef.firebaseapp.com",
	projectId: "date-rate-f54ef",
	storageBucket: "date-rate-f54ef.appspot.com",
	messagingSenderId: "273808888996",
	appId: "1:273808888996:web:9c33f96f923199aca48231",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
