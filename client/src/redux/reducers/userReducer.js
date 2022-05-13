import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_ACCOUNT_DETAILS,
} from '../constants/userConstants';
// {
//     type: 'LOGIN_USER',
//     payload: payload,
//   };
// export const loginUser = (payload) => {
//   localStorage.setItem('userInfo', JSON.stringify(payload));
//   return {
//     type: LOGIN_USER,
//     payload: payload,
//   };
// };

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case LOGOUT_USER:
      return {};
    case UPDATE_ACCOUNT_DETAILS:
      return { ...state, loginSuccess: { ...state.loginSuccess, ...action.payload } };
    default:
      return state;
  }
};

export default userReducer;
