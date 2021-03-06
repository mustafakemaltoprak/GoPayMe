import axios from 'axios';
import { confighelper } from './helpers-services';

export const createFundraiser = async (formObj) => {
  const config = confighelper(formObj.token);
  console.log('config', config);
  delete formObj['token'];
  console.log('forrrrrr', formObj);
  const { data } = await axios.post('/fundraiser/create', formObj, config);
  console.log('testing result', data);
  return data;
};


export const deleteFundraiser = async (id) => {
  const token = JSON.parse(localStorage.getItem('userInfo')).token;
  const config = confighelper(token);

  const { data } = await axios.delete(`/fundraiser/${id}`, config);
  console.log('testing result', data);
  return data;
};


export const editFundraiser = async () => {};


//get
export const fetchData = async (variables) => {
  const token = JSON.parse(localStorage.getItem('userInfo')).token;

  const config = confighelper(token);
  // console.log('config', config);
  // delete formObj['token'];
  console.log('config', config);
  const { data } = await axios.post('/fundraiser', variables, config);
  console.log('testing result', data);
  return data;
};

export const fetchUserCreatedFundraisers = async (id) => {
  const token = JSON.parse(localStorage.getItem('userInfo')).token;

  const config = confighelper(token);
  // console.log('config', config);
  // delete formObj['token'];
  console.log('config', config);
  const { data } = await axios.get(`/users/fundraiser/${id}`, config);
  console.log('testing result', data);
  return data;
};

// export const fetchUserCreatedFundraisers = async (id) => {
//   const token = JSON.parse(localStorage.getItem('userInfo')).token;

//   const config = confighelper(token);
//   // console.log('config', config);
//   // delete formObj['token'];
//   console.log('config', config);
//   const { data } = await axios.get(`/users/fundraiser/${id}`, config);
//   console.log('testing result', data);
//   return data;
// };

