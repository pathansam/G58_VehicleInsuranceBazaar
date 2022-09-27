
import { NavLink, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Authorization from '../../Authorization';

import './policy.css'


const Policy = (props) => {
    console.log(props)
    const p = props.policy;
    const history=useHistory();

    const buyPolicy=(e)=>{
      e.preventDefault();

        console.log(sessionStorage.getItem("chasisNo"))
        sessionStorage.setItem("policyId",e.target.value);
        if(sessionStorage.getItem("chasisNo")==null){
          
          toast.info("please choose Vehicle",1000)
          history.push("/profile")
        }
          else
          {
        
            sessionStorage.setItem("policy",JSON.stringify(props.policy))
                history.push("/payment")
          }
    }

    const deletePolicy=(e)=>{
      e.preventDefault();
      props.delete(e.target.value)
    }
    const updatePolicy=(e)=>{
      e.preventDefault();
      sessionStorage.setItem("policyId",e.target.value);
      history.push("/updatepolicy")
    }
    return (
        <>
<div >
    <div class="my-5 py-4 px-5 bg-light d-sm-flex align-items-center justify-content-between">
      <div class="text-center">
      <small class="d-block heading">starting From</small>
        <h2 class="my-2 font-weight-bold">${p.policyPremium}</h2>
        <small class="text-uppercase text-secondary"></small>
      </div>
      <div class="text-center text-uppercase text-secondary">
        <small class="d-block heading">Name</small>
        <small class="d-block my-3">{p.policyName}</small>
        
      </div>
      <div class="text-center text-uppercase text-secondary">
        <small class="d-block heading">Type</small>
        <small class="d-block my-3">{p.policyType}</small>
      </div>

      <div class="text-center text-uppercase text-secondary">
        <small class="d-block heading">policyLaunchDate</small>
        <small class="d-block my-3">{p.policyLaunchDate}</small>
      </div>
      <div class="text-center text-uppercase text-secondary">
        <small class="d-block heading">Duration</small>
        <small class="d-block my-3">{p.duration} YEARS</small>
      </div>
      {
        props.isView?
      <div class="text-center">
        <NavLink to="/profile" class="btn text-white px-5 py-3 main-btn">Back</NavLink>
      </div>
      :
      <div class="text-center">
        {
         Authorization.IsCustomer()?<button onClick={buyPolicy} value={p.policyId} class="btn text-white px-5 py-3 main-btn"
       
         >BUY</button>:"" 
        } 
        <br/>
        &nbsp;&nbsp;
        {
           props.delete?<button style={{color:"danger"}} onClick={deletePolicy} value={p.policyId} class="btn text-white px-5 py-3 main-btn "
          
           >Delete</button>:""
        }
        <br/>
        &nbsp;&nbsp;
        {
          props.delete?<button onClick={updatePolicy} value={p.policyId} class="btn text-white px-5 py-3 main-btn"
    
          >Update</button>:""
        }
        
      </div>
}   
  </div>
  </div>

    </>
  )
}
export default Policy;