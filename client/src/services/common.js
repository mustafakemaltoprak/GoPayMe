import axios from 'axios';
import { confighelper } from './helpers-services';

export const searchService = async (searchValue) => {
  const token = JSON.parse(localStorage.getItem('userInfo')).token;
  const config = confighelper(token);
  // console.log('config', config);
  // delete formObj['token'];
  console.log('forrrrrr',searchValue);

  const { data } = await axios.get(`/fundraiser/search/?searchTerm=${searchValue}`, config);
  console.log('testing result', data);
  return data;
};

