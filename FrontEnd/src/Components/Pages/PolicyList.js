
import { FunctionsSharp } from "@mui/icons-material";
import { useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import ProviderService from "../../Services/ProviderService";
import UserService from "../../Services/UserService";
import Customer from "./Customer/Customer";
import Policy from "./Policy"
import './policylist.css'

function PolicyList(props){
 //const [any, forceUpdate] = useReducer(num => num + 1, 0);
      const[noOfPage,setNoOfPage]=useState([]);
      // const str="";    
  
   
      return (
      <>
 <div class="container15"
      style={{width:"130%",
      fontSize:"10px",
      marginLeft:"-250px",
      marginRight:"40px",
      padding:"0 8%"
      }}
 >
                  {
            props.policies.length!==0?
                  props.policies.map(policy=>
                  <Policy policy={policy} delete={props.delete}/>):
                  "No Policies available"}
          </div>
        
</> 
      );
}
export default PolicyList;