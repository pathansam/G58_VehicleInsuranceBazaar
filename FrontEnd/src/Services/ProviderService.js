import Authorization from "../Authorization";
import httpClient from "./http-common";

const getAllPoliciesOfProvider=(pageNo)=>{
   return httpClient.get(`/provider/${Authorization.getUser().userId}/policies?pageNo=${pageNo}`)
}

const addPolicy=(policy)=>{
   return httpClient.post(`/provider/${Authorization.getUser().userId}`,policy)
}

const deletePolicy=(id)=>{
   return httpClient.delete(`/provider/${Authorization.getUser().userId}/policies/${id}`)
}

const updatePolicy=(id)=>{
   return httpClient.put(`/provider/${id}`)
}
const getProvider=()=>{
   return httpClient.get(`/provider/${Authorization.getUser().userId}`)
}

const getNoOfPolicies=()=>{
   return httpClient.get(`/provider/${Authorization.getUser().userId}/countPolicy`)
}
export default {getAllPoliciesOfProvider,addPolicy,deletePolicy,updatePolicy,getProvider,getNoOfPolicies}