import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './firebase';
import axios from 'axios'


// export const creatEmailAccount (first) => {  }

// export const login (email, password) => {

//   }


export const googleLogin  =  async() => {
  const googleAuthProvider = new GoogleAuthProvider()
    const response = await signInWithPopup(auth, googleAuthProvider);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('response', response)
    // axios.post('/users/login', )
    // return 
  }