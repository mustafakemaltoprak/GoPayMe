import { FUNDRAISER_DELETED,FUNDRAISER_CREATED,FUNDRAISER_EDITED } from '../constants/fundraiserConstants';

export const createFundraiser = (payload) => {
  return {
    type: FUNDRAISER_CREATED,
    payload,
  };
};

export const editFundraiser = (payload) => {
  
  return {
    type: FUNDRAISER_EDITED,
    payload: payload,
  };
};

export const deleteFundraiser = () => {

  return {
    type: FUNDRAISER_EDITED,
  };
};
