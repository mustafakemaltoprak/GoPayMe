import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './firebase';
import axios from 'axios';
import { toast } from 'react-toastify';

export const creatEmailAccount = async (payload) => {
  console.log('response', payload.email, payload.password);
  try {
    const response = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
    console.log('response', response);
    if (!response) throw new Error('server firebase error');

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = axios.post(
      '/users/register',
      { userId: response.user.uid, email: payload.email, name: payload.name },
      config,
    );
    console.log('register data', data);
    if (!data) throw new Error('Server error');
    return data;
  } catch (error) {
    toast.error(error);
  }

  // return
};

// export const login (email, password) => {

//   }

export const googleLogin = async () => {
  const googleAuthProvider = new GoogleAuthProvider();
  try {
    const response = await signInWithPopup(auth, googleAuthProvider);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('response', response);
    if (response) {
      const { data } = await axios.post(
        '/users/login',
        { userId: response.user.uid, email: response.user.email, name: response.user.displayName },
        config,
      );

      if (!data) throw new Error('Server Email signin error');
      toast.success('Signed in');
      return data;
    }
  } catch (error) {
    toast.error(error.message);
  }

  // axios.post('/users/login', )
  // return
};

export const emailLogin = async (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const data = await signInWithEmailAndPassword(auth, payload.email, payload.password)
    .then(async (response) => {
      console.log('userCred', response);
      const { data } = await axios.post('/users/login', { userId: response.user.uid }, config);

      if (!data) throw new Error('Server Email signin error');
      console.log('userCredegege', data);
      return data;
    })
    .catch((error) => {
      toast.error(error.message);
    });

  return data;

  //   if (!response) throw new Error('server error');

  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };
  //   axios.post('/users/register', { userId: response.user.id }, config);
  // } catch (error) {
  //   console.log('Signup error', error);
};

// axios.post('/users/login', )
// return
