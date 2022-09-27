
import React, { useState} from 'react'
import { useHistory } from 'react-router-dom'
import * as Components from '../Component';
import reg from './../../img/register.svg'
import ProviderService from '../../../Services/ProviderService';
import { toast } from 'react-toastify';

    

const AddPolicy = () => {

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
    
    const addPolicyDetails=(e)=>{
        e.preventDefault();
        ProviderService.addPolicy(policy).then(res=>{
            toast.success("Policy Added Successfully",1000)
            console.log(res)
            history.push(`/profile`,res.data.data)
        }
        ).catch(err=>console.log(err))
    }

    return (
            <Components.div>               
                    <Components.Form>
                        <Components.Title>Add Policy </Components.Title>
                        <Components.Input type='text' name="policyName" value={policyName} placeholder='Enter policy Name' onChange={handlechange} />
                        <Components.Input type='number' name="policyPremium" value={policyPremium} placeholder="Enter policy Pemium" onChange={handlechange} />
                        <Components.Input type='text' name="policyType" value={policyType} placeholder='Enter policy Type' onChange={handlechange} />
                        <Components.Input type='date' name="policyLaunchDate" value={policyLaunchDate}  onChange={handlechange} />
                        <Components.Input type='number' name="duration" value={duration} placeholder='Enter Policy Duration' onChange={handlechange} />
                        <br/>
                        <Components.Button onClick={addPolicyDetails}>Add Policy</Components.Button><br/>
                        <Components.Cancel  onClick={()=>history.push("/profile")}>Cancel</Components.Cancel>
                        <br />
                        <img src={reg} alt="signin" style={{height:"400px"}} />
                    </Components.Form>          
            </Components.div>         
    )
}

export default AddPolicy;
