import axios from 'axios';


export default axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
    'Content-Type': 'application/json',
  },
});
