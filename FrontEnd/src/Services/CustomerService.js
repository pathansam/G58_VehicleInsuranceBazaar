
import Authorization from '../Authorization';
import httpClient from './http-common';

// const jwt=sessionStorage.getItem("jwt");

const getPolicyById=(id)=>{
    const  user=JSON.parse(sessionStorage.getItem("user"));
    return httpClient.get(`/customers/${user.userId}/policy/${id}`);
}

const doPayment=(payment)=>{
    const  user=JSON.parse(sessionStorage.getItem("user"));
    console.log(user.userId)
    console.log(sessionStorage.getItem("policyId"))
    console.log(sessionStorage.getItem("chasisNo"))
    console.log(payment)    
    return httpClient.post(`/customers/${user.userId}/payment?policyId=${sessionStorage.getItem("policyId")}&chasisNo=${sessionStorage.getItem("chasisNo")}`,payment);
} 

const getLicenseNo=()=>{
    const  user=JSON.parse(sessionStorage.getItem("user"));
    return httpClient.get(`/customers/${user.userId}`);
}

const getAllVechiles=()=>{
    
    const  user=JSON.parse(sessionStorage.getItem("user"));
    return httpClient.get(`/customers/${user.userId}/vehicles`)
}
const addVehicle=(vehicle)=>{
    const user=JSON.parse(sessionStorage.getItem("user"));
    return httpClient.post(`/customers/${user.userId}/vehicles`,vehicle)
}
const subscribePolicy=(vid,policyId)=>{
    const user=JSON.parse(sessionStorage.getItem("user"));
    return httpClient.get(`/customers/${user.userId}/vehicles/${vid}/addPolicy?policyId=${policyId}`)
}

const deleteVechile=(vid)=>{
    const user=Authorization.getUser();
    return httpClient.delete(`/customers/${user.userId}/vehicles/${vid}`)

}
const getVechileDetails= async()=>{
    const user=Authorization.getUser();
    const vid=sessionStorage.getItem("chasisNo")
    // const vid="1234566"
    return httpClient.get(`/customers/${user.userId}/vehiclePolicyDetails/${vid}`) 
}


export default {getAllVechiles,addVehicle,getLicenseNo,subscribePolicy,deleteVechile,getPolicyById,doPayment,getVechileDetails};
  