import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from '../constants/userConstants';

export const registerUser = () => {
  return {
    type: REGISTER_USER,
  };
};

export const loginUser = (payload) => {
  localStorage.setItem('userInfo', JSON.stringify(payload));
  return {
    type: LOGIN_USER,
    payload: payload,
  };
};

export const logoutUser = (payload) => {
  localStorage.removeItem('userInfo');
  return {
    type: LOGOUT_USER,
    payload,
  };
};
