import axios from 'axios';
import { confighelper } from './helpers-services';

export const createMessage = async (payload) => {
  const token = JSON.parse(localStorage.getItem('userInfo')).token;
  const config = confighelper(token);
  // delete formObj['token'];
  // console.log('forrrrrr', formObj);
  const { data } = await axios.post('/users/messages/create', payload, config);
  // console.log('testing result', data);
  return data;
};

export const fetchMessages = async (receiverId) => {
  const { token, _id } = JSON.parse(localStorage.getItem('userInfo'));
  const config = confighelper(token);
  // delete formObj['token'];
  console.log('forrrrrr', _id, receiverId);
  const { data } = await axios.get(`/users/messages/${_id}/${receiverId}`, config);
  // console.log('testing result', data);
  return data;
};



export const fetchAllConversations = async () => {
  const { token, _id } = JSON.parse(localStorage.getItem('userInfo'));
  const config = confighelper(token);
  // delete formObj['token'];
  // console.log('forrrrrr', _id, receiverId);
  const { data } = await axios.get(`/users/messages/${_id}`, config);
  // console.log('testing result', data);
  return data;
};
