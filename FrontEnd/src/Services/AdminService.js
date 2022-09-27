import Authorization from '../Authorization';
import httpClient from './http-common';

const getAllProviders=()=>{
    const  user=JSON.parse(sessionStorage.getItem("user"));
return httpClient.get(`/admin/${user.userId}/providers`);
}
const changeStatus=(id,status)=>{
    const  user=JSON.parse(sessionStorage.getItem("user"));
    return httpClient.patch(`/admin/${user.userId}/${id}?status=${status}`)
}
const deleteProvider=(providerId)=>{
    const  user=JSON.parse(sessionStorage.getItem("user"));
    return httpClient.delete(`/admin/${user.userId}/providers/${providerId}`)
}
export default {getAllProviders,changeStatus,deleteProvider};