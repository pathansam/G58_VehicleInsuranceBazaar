
import { Link } from "react-router-dom";
import React from 'react'
import Authorization from "../../Authorization";


function RoleNavbar() {
    console.log(Authorization.IsCustomer());
    if (Authorization.IsLoggedIn()) {
      return (
        <>
<div class="dropdown" style={{margin:"6% 10%"}}>
  <button class="btn btn-secondary dropdown-toggle" 
  type="button" style={{backgroundColor:"black",border:"1px solid",fontSize:"15px"}} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Continue As
  </button>
  <div class="dropdown-menu" style={{fontSize:"15px"}} aria-labelledby="dropdownMenuButton">
  {
    Authorization.getUser().roles.includes("ADMIN")?<Link onClick={()=>{sessionStorage.setItem("IsAdmin",true);window.location.reload()}}  className="dropdown-item" >ADMIN</Link>:""
  }
  {
    Authorization.IsProvider()?<Link onClick={()=>{sessionStorage.setItem("IsAdmin",false);window.location.reload()}} className="dropdown-item" >POLICY PROVIDER</Link>:""
  }
  {
    Authorization.IsCustomer()?
    <Link className="dropdown-item" to="/profile">CUSTOMER</Link>:""
  }
  {(Authorization.IsCustomer()&&Authorization.IsProvider())?"":
    <Link className="dropdown-item" to="/addrole">+ Add Role</Link>
  }
   
    
  </div>
</div>
        </>
      );
    }
    
}

export default RoleNavbar