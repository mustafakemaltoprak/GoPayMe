import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './firebase';
import axios from 'axios';
import { toast } from 'react-toastify';
import { confighelper } from './helpers-services';

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
    const { data } = await axios.post(
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

       console.log(' login data', response, 'data', data);

      if (!data) throw new Error('Server Email signin error');
      // toast.success('Signed in');
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

export const postCategories = async (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.post(
    `/users/categories/${payload.userId}`,
    { categories: payload.categories },
    config,
  );

  if (data) {
    return data;
  } else {
    return false;
  }
};

export const createNotification = async (payload) => {
  const { token, userId, name } = JSON.parse(localStorage.getItem('userInfo'));

  const config = confighelper(token);

  payload = { ...payload, senderName: name, senderId: userId };

  console.log('payload', payload);
  const { data } = await axios.post(`/users/notification`, payload, config);

  console.log();
  if (data.success) {
    return true;
  } else {
    return false;
  }
};

export const fetchUserDetails = async (id) => {
  const { token } = JSON.parse(localStorage.getItem('userInfo'));

  const config = confighelper(token);

  // console.log('tok', token);

  const { data } = await axios.get(`/users/${id}`, config);
  console.log('userDetails Info', data);

  console.log();
  if (data) {
    return data;
  }
};

export const notificationRespond = async (payload) => {
  const { token, _id } = JSON.parse(localStorage.getItem('userInfo'));

  const config = confighelper(token);

  // console.log('tok', token);

  const { data } = await axios.post(`/users/account`, { ...payload, _id }, config);

  console.log();
  if (data) {
    console.log('that was updated!', data);
    return data;
  }
};

export const getAccountDetails = async () => {
  const { token } = JSON.parse(localStorage.getItem('userInfo'));

  const config = confighelper(token);

  // console.log('tok', token);

  const { data } = await axios.get(`/users/account`, config);

  console.log();
  if (data) {
    // console.log('that was updated!');
    return data;
  }
};

export const createBookMark = async (payload) => {
  const { token } = JSON.parse(localStorage.getItem('userInfo'));

  const config = confighelper(token);

  // console.log('tok', token);

  const { data } = await axios.post(`/users/fundraiser/bookmark`, payload, config);

  console.log();
  if (data) {
    // console.log('that was updated!');
    return data;
  }
};

export const avatarUpdate = async (payload) => {
  const { token } = JSON.parse(localStorage.getItem('userInfo'));

  // console.log('avatar payloadd', payload)
  const config = confighelper(token);

  // console.log('tok', token);

  const { data } = await axios.put(`/users/account`, payload, config);

  console.log();
  if (data) {
    // console.log('that was updated!', data);
    return data;
  }
};

// ax
// axios.post('/users/login', )
// return
