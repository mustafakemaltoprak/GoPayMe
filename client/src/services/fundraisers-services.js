import axios from 'axios';
import { confighelper } from './helpers-services';


export const createFundraiser = async (formObj) => {
  const config = confighelper(formObj.token);
  console.log('config',config)
  delete formObj['token']
  console.log('forrrrrr',formObj)
  const {data} = await axios.post('/fundraiser/create', formObj, config);
console.log('testing result', data)
  return data

};

export const editFundraiser = async () => {};
