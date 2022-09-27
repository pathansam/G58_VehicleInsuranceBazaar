import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import * as Components from '../../Pages/Component';
import 'react-toastify/dist/ReactToastify.css';
import forget from './../../img/forget-pass.svg'
import UserService from '../../../Services/UserService';
import { toast } from 'react-toastify';


export const ForgetPass = (props) => {
    const history = useHistory();
    const[boolean,setBoolean]=useState(true);
    const [user1, setUser1] = useState({
        email: "",
        otp: ""
    }, [])
    const [update,setUpdate]=useState(false);
    const [password, setPassword] = useState({
        password: '',
        confirmPass:''
    }, [])
    const handleLogin = event => {
        const { name, value } = event.target
        setUser1({
            ...user1,
            [name]: value
        })
    }  

        const [min, setMinutes] = useState(0);
        const [sec, setSeconds] = useState(0); 
        const deadline = Date.now()+10*60*1000;      
        const getTime = () => {
          const time = deadline-Date.now();
          setMinutes(Math.floor((time/1000/60) % 60));
          setSeconds(Math.floor((time/1000) % 60));
        };
      
        useEffect(() => {
          const interval = setInterval(() => getTime(deadline), 1000);
          return () => clearInterval(interval);
        },boolean);
      
    
    const setOTP=(e)=>{
        
        e.preventDefault();
        axios.get("http://localhost:8080/api/forgetpass?email="+user1.email)
            .then(res => {
                console.log(res)
                setBoolean(false);
                toast.success("OTP send Successfully...",1000)
            }).catch(err => { 
                console.log(err) 
            })

    }
    const submitOTP=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/api/forgetpass",user1)
            .then(res => {
                console.log(res)
                setBoolean(true);
                toast.success("OTP Validated...please Set New Password",1000)
                sessionStorage.setItem("jwt",res.data.jwt);
                sessionStorage.setItem("user",JSON.stringify(res.data.user));
                console.log(res.data.jwt);
                console.log(res.data.user)
                setUpdate(true);
                window.location.reload()
                
            }).catch(err => { 
                console.log(err) 
                toast.error("Wrong OTP",1000)
            })
    }
    const handleUpdate = event => {
        console.log(event.target.value)
        const { name, value } = event.target
        setPassword({
            ...password,
            [name]: value
        })
    }  
    const changePass=(e)=>{
        e.preventDefault();
        if(password.confirmPass!==password.password)
            toast.error("password not matched",1000)
        else{
            UserService.updatePassword({email:user1.email,newPass:password.password}).then(res=>{
                console.log(res.data);
                props.setForget(false);
            })
            .catch(err=>console.log(err))
        }
    }
    return (
        <div>
           {update?
           <Components.Form>
                <Components.Title>Change Password</Components.Title>
               <Components.Input   type='password' name="password" value={password.password} onChange={handleUpdate} placeholder="Enter New Password" />
                <Components.Input    type='password' name="confirmPass" value={password.confirmPass} onChange={handleUpdate} placeholder="Confirm Password" />                
                 <Components.Button onClick={changePass}>Submit</Components.Button><br />   
            </Components.Form>
           
           :
            <Components.Form>
                <Components.Title>Forget Password</Components.Title>

                {boolean?<Components.Input   type='email' name="email" value={user1.email} onChange={handleLogin} placeholder="Enter your Email" />
                :<Components.Input readOnly   type='email' name="email" value={user1.email} onChange={handleLogin} placeholder="Enter your Email" />                
                }
                
                {boolean?"":<Components.Input type='text'  name="otp" value={user1.otp} onChange={handleLogin} placeholder="Enter OTP" />}
                {
                    boolean?
                    <><Components.Button onClick={setOTP}>Generate OTP</Components.Button><br />
                    
                    </>:
                    
                    <>
                    <p>Send Otp after {min}.{sec}</p>
                    <Components.Button onClick={submitOTP}>Submit</Components.Button><br /></>
                }
                
                <img src={forget} alt="register" style={{width:"550px",height:"650px"}} />
            </Components.Form>
}
        </div>
    )
}

export default ForgetPass;




