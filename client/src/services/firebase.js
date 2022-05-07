// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB-RmPpJYqoDmjBqPe-7ds5lWj75aGZd3w',
  authDomain: 'thesis-39662.firebaseapp.com',
  projectId: 'thesis-39662',
  storageBucket: 'thesis-39662.appspot.com',
  messagingSenderId: '582610914546',
  appId: '1:582610914546:web:028f0aed09b0476199946b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const database = getDatabase(app);
