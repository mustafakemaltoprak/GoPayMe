import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from '../constants/userConstants';
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
    default:
      return state;
  }
};

export default userReducer;
