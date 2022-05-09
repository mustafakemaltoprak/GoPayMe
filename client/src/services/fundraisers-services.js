import axios from 'axios';
import { confighelper } from './helpers-services';


export const createFundraiser = async (formObj) => {
  const config = confighelper(formObj.token, formObj.userId);
  const {data} = await axios.post('/fundraiser/create', formObj, config);
};

export const editFundraiser = async () => {};
