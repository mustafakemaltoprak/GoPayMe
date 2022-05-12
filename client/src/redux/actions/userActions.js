import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, UPDATE_ACCOUNT_DETAILS} from '../constants/userConstants';

export const registerUser = (payload) => {
  return {
    type: REGISTER_USER,
    payload,
  };
};

export const loginUser = (payload) => {
  localStorage.setItem('userInfo', JSON.stringify(payload));
  return {
    type: LOGIN_USER,
    payload: payload,
  };
};

export const logoutUser = () => {
  localStorage.removeItem('userInfo');
  return {
    type: LOGOUT_USER,
  };
};

export const updateUserDetails = (payload) => {
  // localStorage.setItem('userInfo', JSON.stringify(payload));
  return {
    type: UPDATE_ACCOUNT_DETAILS,
    payload: payload,
  };
};
