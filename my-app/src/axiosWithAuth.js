import axios from 'axios';



export const axiosWithAuth = () => {
  
  return axios.create({
    baseURL: 'http://localhost:4000/api/users/',
   
  });
};