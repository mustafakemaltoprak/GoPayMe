import {
  FUNDRAISER_CREATED,
  FUNDRAISER_DELETED,
  FUNDRAISER_EDITED,
  FUNDRAISER_FETCH
} from '../constants/fundraiserConstants';
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

const fundraiserReducer = (state = { fundraisers: [] }, action) => {
  switch (action.type) {
    case FUNDRAISER_FETCH:
      return { ...state, fundraisers: action.payload };
    case FUNDRAISER_CREATED:
      return { ...state, fundraisers: [state.fundraisers, action.payload] };
    case FUNDRAISER_EDITED:
      return {
        ...state,
        fundraisers: state.fundraisers.map((fund) =>
          fund._id === action.payload._id ? action.payload : fund,
        ),
      };
    case FUNDRAISER_DELETED:
      return {
        ...state,
        fundraisers: state.fundraisers.filter((fund) => fund._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export default fundraiserReducer;
