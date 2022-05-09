import { FUNDRAISER_DELETED,FUNDRAISER_CREATED,FUNDRAISER_EDITED } from '../constants/fundraiserConstants';

export const createFundraiserAction = (payload) => {
  return {
    type: FUNDRAISER_CREATED,
    payload,
  };
};

export const editFundraiserAction = (payload) => {
  return {
    type: FUNDRAISER_EDITED,
    payload: payload,
  };
};

export const deleteFundraiserAction = () => {
  return {
    type: FUNDRAISER_EDITED,
  };
};
