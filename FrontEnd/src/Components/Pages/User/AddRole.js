import './addrole.css'

import { useHistory } from 'react-router-dom'
import UserService from '../../../Services/UserService';
import React, { useEffect, useState} from 'react'
import * as Components from './../User/RoleComponent';
import { useDispatch, useSelector } from "react-redux";
import { padding } from '@mui/system';

function AddRole(){
    const history = useHistory();
    const despatch=useDispatch();
    const[checked,setChecked]=useState(true)
    const[checked1,setChecked1]=useState(false)
    const[companies,setCompanies]=useState([])
    const [role, setRole] = useState({
        companyName:"",
        licenceNo:"",
        roles:""
    })

    const handlechange = e => {
        console.log(e.target.value)
        setRole({
            ...role, [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        UserService.getAllCompanies().then(res=>{
            console.log(res.data);
            setCompanies(res.data)
            })
            .catch(err=>console.error(err))
    },[])
    useEffect(()=>{
        if(checked)
            setRole({
                ...role,roles:"CUSTOMER",
            })
        if(checked1)
            setRole({
                ...role,roles:"POLICY_PROVIDER",
            })    
    },[checked,checked1])

    const addRole=(e)=>{
        e.preventDefault();
        console.log(role)
        UserService.addRole(role)
        .then(res=>{
            const user=JSON.parse(sessionStorage.getItem("user"))
            user.roles.push(role.roles);
            UserService.getUser()
            .then(resp=>{
                console.log(resp.data.data)
                sessionStorage.setItem("user",JSON.stringify(resp.data.data))
                sessionStorage.setItem("roles",JSON.stringify(resp.data.data.roles))
                window.location.reload();
            })
            .catch(err=>{
                console.log(err)
            })
            console.log(res.data);
            despatch({type:"IsLoggedIn"});
            history.push(`/profile`,res.data.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <>
        <Components.div>
        <div className='container'>
        <h1>Add Role Page</h1>    
            <Components.Form>           
            <Components.Input type='radio' name="roleName" value={"CUSTOMER"} onChange={()=>{setChecked1(!checked1);setChecked(!checked)}} checked={checked}/>Customer
            {
                checked?(
                    <Components.Input type='text' name="licenceNo" value={role.licenceNo} placeholder='Enter licence No' onChange={handlechange} />
                ):<></>
            }
            <br/><Components.Input type='radio' name="roleName" value={role.roles} onChange={()=>{setChecked(!checked);setChecked1(!checked1)}} checked={checked1} />Policy Provider 
            {
                checked1?(
                    <>
                    <select style={{fontSize:"16px",width:"100%" ,padding:2,margin:10}} name="companyName" className='dropdown'  placeholder='Enter Company Name' onChange={handlechange} >
                    <option value='select' selected>--select--</option>
                       {companies.map(c=>{
                            return <option  value={c}><p style={{"font-size": "15px"}}>{c}</p></option>
                       })      
                       }  
                    </select>
                    </>
                ):<></>
            }
            <Components.Button onClick={addRole}>Add Role</Components.Button>
            </Components.Form>
        </div> 
        </Components.div>
        </>
    )
}
export default AddRole;