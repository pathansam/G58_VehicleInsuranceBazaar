import httpClient from './http-common';

const addRole = (role) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return httpClient.post(`/users/${user.userId}/role`, role)
}
const getAll = (pageNo) => {
  console.log("page no "+pageNo)
  return httpClient.get(`/policies?pageNo=${pageNo}`);
};
const updateProfile = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return httpClient.put(`/users/${user.userId}`)
}

const getUSerNames = () => {
  return httpClient.get('/unames')
}
const getEmails = () => {
  return httpClient.get('/emails')
}

const getUser=()=>{
  const user = JSON.parse(sessionStorage.getItem("user"));
  return httpClient.get(`/users/${user.userId}`)
}

const updatePassword=(userUpdate)=>{
  const user = JSON.parse(sessionStorage.getItem("user"));
  return httpClient.post(`/users/${user.userId}/resetPass`,userUpdate)
}

const getAllCompanies=()=>{
  return httpClient.get(`/users/getCompanies`)
}

const getNoOfPolicies=()=>{
  return httpClient.get(`/getNoOfPolicies`)
}

export default { getNoOfPolicies,getAll, addRole, updateProfile, getUSerNames, getEmails,getUser,updatePassword,getAllCompanies};