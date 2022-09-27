
import React, { useState} from 'react'
import { useHistory } from 'react-router-dom'
import * as Components from './../Component';
import reg from './../../img/register.svg'

import CustomerService from "../../../Services/CustomerService";
import { toast } from 'react-toastify';
const LOGIN_URL = 'http://localhost:8080/api/login';
    

const AddVehicle = () => {

    const history = useHistory();
    
    const [vehicle, setVehicle] = useState({
        chasisNo: "",
        vehicleType: "",
        registrationDate: "",
        vehicleNumber: ""
    })
    const {chasisNo,vehicleType,registrationDate,vehicleNumber}=vehicle

    const handlechange = e => {
        setVehicle({
            ...vehicle, [e.target.name]: e.target.value
        })
    }
    
    const addVehcleDetails=(e)=>{
        e.preventDefault();
        CustomerService.addVehicle(vehicle).then(res=>{
            toast.success("Vehicle added successfully.......")
            history.push(`/profile`,res.data.data)
        }
        )
    }

    return (
            <Components.div>               
                    <Components.Form>
                        <Components.Title>Add Vehicle </Components.Title>
                        <Components.Input type='text' name="chasisNo" value={chasisNo} placeholder='Enter Chasis No' onChange={handlechange} />
                        <Components.Input type='text' name="vehicleNumber" value={vehicleNumber} placeholder='Enter vehicle Number' onChange={handlechange} />
                        <Components.Input type='date' name="registrationDate" value={registrationDate}  onChange={handlechange} />
                        <Components.Input type='text' name="vehicleType" value={vehicleType} placeholder='Enter vehicleType' onChange={handlechange} />
                        <br/>
                        <Components.Button onClick={addVehcleDetails}>Add Vehicle</Components.Button><br/>
                        <Components.Cancel  onClick={()=>history.push("/customer")}>Cancel</Components.Cancel>
                        <br />
                        <img src={reg} alt="signin"
                        style={{height:"400px"}}
                        />
                    </Components.Form>          
            </Components.div>         
    )
}

export default AddVehicle;
