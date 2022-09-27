import { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import Authorization from '../../../Authorization';
import AdminService from '../../../Services/AdminService';
import ProviderService from '../../../Services/ProviderService';


import './policy.css'


const Provider = (props) => {

 //const [relode,setRelode]=useState(1);

  const history=useHistory();
    console.log(props)
    const p = props.provider;

    const approve=(e)=>{
      e.preventDefault();
      AdminService.changeStatus(e.target.value,"APPROVED")
      .then(res=>{
        console.log(res.data)
        //setRelode(relode+1);
        window.location.reload()
      })
      .catch(err=>{
        console.log(err)
      })
    }
    const reject=(e)=>{
      e.preventDefault();
      AdminService.changeStatus(e.target.value,"REJECTED")
      .then(res=>{
        console.log(res.data)
        window.location.reload()
      })
      .catch(err=>{
        console.log(err)
      })
    }
    const deleteProvider=(e)=>{
      e.preventDefault();
      AdminService.deleteProvider(e.target.value)
      .then(res=>{
        console.log(res.data)
        window.location.reload()
      })
      .catch(err=>{
        console.log(err)
      })
    }

    return (
        <>

    <div class="my-5 py-4 px-5 bg-light d-sm-flex align-items-center justify-content-between">
      <div class="text-center">
      <small class="d-block heading">Provider  Id</small>
        <h2 class="my-2 font-weight-bold">{p.providerId}</h2>
        <small class="text-uppercase text-secondary"></small>
      </div>
      <div class="text-center text-uppercase text-secondary">
        <small class="d-block heading">Company Name</small>
        <small class="d-block my-3">{p.companyName}</small>
        
      </div>
      <div class="text-center text-uppercase text-secondary">
        <small class="d-block heading">Provider Name</small>
        <small class="d-block my-3">{p.user.firstName+" "+p.user.lastName}</small>
      </div>

      <div class="text-center text-uppercase text-secondary">
        <small class="d-block heading">Status</small>
        <small class="d-block my-3">{p.status}</small>
      </div>
      {
        props.isView?
      <div class="text-center">
        <NavLink to="/profile" class="btn text-white px-5 py-3 main-btn">Back</NavLink>
      </div>
      :
      <div class="text-center">
        {
         p.status==="PENDING"?<button onClick={approve}  value={p.providerId} class="btn text-white px-5 py-3 main-btn">Approve</button>:"" 
        }
        &nbsp;&nbsp;
        {
            p.status==="PENDING"?<button onClick={reject}  value={p.providerId} class="btn text-white px-5 py-3 main-btn">Reject</button>:""
        }
        &nbsp;&nbsp;
        {
          p.status==="APPROVED"?<button onClick={reject} value={p.providerId} class="btn text-white px-5 py-3 main-btn">Delete</button>
          :
          <button onClick={deleteProvider} value={p.providerId} class="btn text-white px-5 py-3 main-btn">Discard</button>
        }
        
      </div>
      }
  </div>
        </>
    )


}
export default Provider;