export const confighelper = (token, userId) => {
  return {
    headers: {
      'Content-type': 'application/json',
      // Authorization: token ? `Bearer ${token}` : '',
    },
  };
};
