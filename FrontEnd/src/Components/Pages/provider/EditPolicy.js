
import React, { useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import * as Components from '../Component';
import reg from './../../img/register.svg'
import axios from 'axios';
import Authorization from '../../../Authorization';
import { toast } from 'react-toastify';


const EditPolicy = () => {

    const history = useHistory();
    
    const [policy, setPolicy] = useState({
        policyName:"",
        policyPremium:"",
        policyType:"",
        policyLaunchDate:"",
        duration:""
    })
    const {policyName, policyPremium,policyType, policyLaunchDate, duration}=policy

    const handlechange = e => {
        setPolicy({
            ...policy, [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        loadPolicy();
      }, []);

    const savePolicy= async e=>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/api/provider/${Authorization.getUser().userId}`,policy)
        .then(res=>{
            toast.success("Policy Details Updated Successfuly",1000)
            history.push("/profile")
        })
        .catch(err=>{
            toast.error("Something went Wrong",1000)
        })
      }

    const loadPolicy = async () => {
        const result = await axios.get(`http://localhost:8080/api/provider/${Authorization.getUser().userId}/policies/${sessionStorage.getItem("policyId")}`);
        setPolicy(result.data.data);
        sessionStorage.removeItem("policyId");
        console.log(result.data.data)
      };

    return (
            <Components.div>               
                    <Components.Form>
                        <Components.Title>Update Policy </Components.Title>
                        <Components.Input type='text' name="policyName" value={policyName} placeholder='Enter policy Name' onChange={handlechange} />
                        <Components.Input type='number' name="policyPremium" value={policyPremium} placeholder="Enter policy Pemium" onChange={handlechange} />
                        <Components.Input type='text' name="policyType" value={policyType} placeholder='Enter policy Type' onChange={handlechange} />
                        <Components.Input type='date' name="policyLaunchDate" value={policyLaunchDate}  onChange={handlechange} />
                        <Components.Input type='number' name="duration" value={duration} placeholder='Enter vehicleType' onChange={handlechange} />
                        <br/>
                        <Components.Button onClick={savePolicy}>Confirmy</Components.Button><br/>
                        <Components.Cancel  onClick={()=>history.push("/profile")}>Cancel</Components.Cancel>
                        <br />
                        <img src={reg} alt="signin" width='500px' height='250px' />
                    </Components.Form>          
            </Components.div>         
    )
}
export default EditPolicy;