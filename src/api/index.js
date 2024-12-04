export const API_URL = 'http://localhost:8000/';
export const config = () => {
  return {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };
};
export const configForm = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
    },
  };
};
