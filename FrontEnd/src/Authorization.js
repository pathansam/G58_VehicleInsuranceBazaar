import { useState } from "react";
import httpCommon from "./Services/http-common";


let IsLoggedIn=()=>sessionStorage.getItem("jwt")?true:false;
let IsAdmin=()=>{
    
   
    return sessionStorage.getItem("IsAdmin")=="true";
            
};
let IsUser=()=>JSON.parse(sessionStorage.getItem("roles"))!=null&&JSON.parse(sessionStorage.getItem("roles")).includes("USER");
let IsProvider=()=>JSON.parse(sessionStorage.getItem("roles"))!=null&&JSON.parse(sessionStorage.getItem("roles")).includes("POLICY_PROVIDER");
let IsCustomer=()=>{return JSON.parse(sessionStorage.getItem("roles"))!=null&&JSON.parse(sessionStorage.getItem("roles")).includes("CUSTOMER");}
let getUser=()=>JSON.parse(sessionStorage.getItem("user"));
let getName=()=>JSON.parse(sessionStorage.getItem("user")).firstName + " " + JSON.parse(sessionStorage.getItem("user")).lastName;


export default {IsLoggedIn , IsAdmin,IsUser,IsProvider, getUser,IsCustomer, getName};