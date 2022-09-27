import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { useHistory } from 'react-router-dom'
import * as Components from './Pages/Component';
import log from './img/log.svg'
import reg from './img/register.svg'
import { useDispatch } from 'react-redux';
import Authorization from '../Authorization';
import UserService from '../Services/UserService';
import { ForgetPass } from './Pages/User/ForgetPass';
import Captcha from '../Captcha';
import { LoadCanvasTemplateNoReload, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { toast } from 'react-toastify';


const RegisterLogin = (props) => {
    const[forget,setForget]=useState(false);
    const history = useHistory();
    const history1 = useHistory();
    const dispatch = useDispatch();
    const [captcha,setCaptcha]=useState("");
    const [user1, setUser1] = useState({
        email: "",
        password: ""
    }, [])
    //FOR WHEN WE TYPE SOMETHING IN INPUT BOX
    const handleLogin = event => {
        const { name, value } = event.target
        //event.preventDefault();
        setUser1({
            ...user1,
            [name]: value
        })
    }
    
    //SENDING AXIOS REQUEST
    const login = async (e) => {
        e.preventDefault();
        if(validateCaptcha(captcha)==false)
            {
                toast.error("invalid Captcha",1000)
                return;
            }

        axios.post("http://localhost:8080/api/login", user1)
            .then(res => {
                if (res.data.user.roles.includes("ADMIN")) {
                    sessionStorage.setItem("IsAdmin", true);
                }

                console.log(res.data.user)
                sessionStorage.setItem("jwt", res.data.jwt);
                sessionStorage.setItem("user", JSON.stringify(res.data ? res.data.user : null));
                // sessionStorage.setItem("email", res.email);
                // sessionStorage.setItem("uname", res.name);

                sessionStorage.setItem("id", res.id);
                sessionStorage.setItem(
                    "roles",
                    JSON.stringify(res.data.user.roles.length !== 0 ? res.data.user.roles : []
                    ));

                dispatch({ type: "IsLoggedIn" });

                toast.success("Welcome "+res.data.user.firstName,1000);
                console.log(res)
                // if (res.data.user.roles.includes("ADMIN"))
                    history.push("/admin")
                // else {
                    history1.push("/profile")
                // }
            }).catch(err => { 
                    console.log(err) 
                    
                })
    }

    //register
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        address: "",
        contactNumber: "",
        email: "",
        password: "",
        confirmpassword: ""
    })
    const [emails,setEmails]=useState([]);
    const [userNames,setUserNames] = useState([]);

    const initailValues = {
        firstName: "",
        lastName: "",
        userName: "",
        address: "",
        contactNumber: "",
        email: "",
        password: "",
        confirmpassword: ""
    }
    const [formValues, setFormValues] = useState(initailValues);
    const [formErrors, setFormErrors] = useState({});
    const handlechange = event => {
        const { name, value } = event.target
        setUser({
            ...user, [name]: value
        })
        setFormValues({
            ...formValues, [name]: value
        })


    }

    const validate = (values) => {
        console.log("in Error")
        const errors = {
        };

        const contactReg = /^\d{10}$/;
        const passReg = /((?=.*\d)(?=.*[a-z])(?=.*[#@$*]).{8,12})/;
        if (!values.contactNumber.match(contactReg)) {
            errors.contactNumber = "please Enter 10 digit Mobile Number"
        }

        else if(!values.password.match(passReg)) {
            errors.password = "password should contain a letter,special symbol and digit and 8 to 12 characters"
        }
        else if (values.confirmpassword !== values.password) {
            errors.confirmpassword = "password not matched"
        } 
        else if (emails.includes(values.email)) {
            errors.email = "email already exists"
        } 
        else if (userNames.includes(values.userName)) {
            errors.userName = "user Name already exists"
        } 
        else{
            setSubmit(true);
        }


        return errors;
    }

    const loadEmailsAndUserNames=()=>{
        UserService.getEmails()
            .then((res) => {
               // console.log(res.data)
                setEmails(res.data)
            })
            .catch(err => {
                console.log(err)
                toast.error("Something Went Wrong",1000)
               
            })
        UserService.getUSerNames()
            .then((res) => {
                //console.log(res.data)
                setUserNames(res.data)
            })
            .catch(err => {
                console.log(err)
                toast.error("Something Went Wrong",1000)
            })   
    }

console.log(emails)
useEffect(()=>{
        setFormErrors(validate(formValues));
        
    }, [formValues])

    useEffect(()=>
    {
        loadEmailsAndUserNames();
        loadCaptchaEnginge(6,"grey");
        setFormErrors({})
    }
    ,[])
    const [submit,setSubmit]=useState(false);
    const register = (e) => {
        e.preventDefault();
        const { firstName, lastName, userName, address, contactNumber, email, password, confirmpassword } = user
        
        if (Object.keys(formErrors).length===0 && submit) {
            setUser(initailValues)
           // firstName && lastName && userName && address && contactNumber && email && password && (password === confirmpassword)
            axios.post("http://localhost:8080/api", user)
                .then(resp => {
                    toast.success(resp.data)
                    
                    history.push(toggle(true))
                })
        } else {
            toast.error("Invalid",1000)
        }
    }


    const [signIn, toggle] = React.useState(props.toggle);
    return (
        <>
            <Components.Container>
                <Components.SignUpContainer signinIn={signIn}>
                    <Components.Form>
                        <Components.Title style={{color:"black"}}>Create Account</Components.Title>
                        <Components.Input type='text' name="firstName" value={user.firstName} placeholder='Enter your First Name' onChange={handlechange} />
                        <Components.Input type='text' name="lastName" value={user.lastName} placeholder='Enter your last Name' onChange={handlechange} />
                        <Components.Input type='text' name="userName" required value={user.userName} placeholder='Enter your User Name' onChange={handlechange} />
                        <span style={{color:"red",fontSize:"15px"}}>{formErrors.userName}</span>
                        <Components.Input type='text' name="address" value={user.address} placeholder='Enter your Address' onChange={handlechange} />
                        <Components.Input type='text' name="contactNumber" required value={user.contactNumber} placeholder='Enter your Contact Number' onChange={handlechange} />
                        <span style={{color:"red",fontSize:"15px"}}>{formErrors.contactNumber}</span>
                        <Components.Input type='email' name="email" required value={user.email} placeholder='Enter your Email' onChange={handlechange} />
                        <span>{formErrors.email}</span>
                        <Components.Input type='password' name="password" value={user.password} placeholder='Enter your Password' onChange={handlechange} />
                        <span style={{color:"red",fontSize:"15px"}}>{formErrors.password}</span>
                        <Components.Input type='password' name="confirmpassword" value={user.confirmpassword} placeholder='Confirm Password' onChange={handlechange} />
                        <span>{formErrors.confirmpassword}</span>
                        <Components.Button onClick={register}>Register</Components.Button><br />
                        {/* <Components.Button onClick={()=>history.push("/")}>Home</Components.Button> */}
                        <img src={reg} alt="signin" style={{width:'500px',height:'250px'}} />
                    </Components.Form>
                </Components.SignUpContainer>
                
                <Components.SignInContainer signinIn={signIn}>
                {
                forget?<ForgetPass setForget={setForget} />:
                    <Components.Form onSubmit={login}>
                        
                        <Components.Title style={{color:"black"}}>Login</Components.Title>
                        <Components.Input type='email' name="email" value={user1.email} onChange={handleLogin} placeholder="Enter your Email" />
                        <Components.Input type='password' name="password" value={user1.password} onChange={handleLogin} placeholder="Enter your Password" />
                        
                        <LoadCanvasTemplateNoReload  id="reload_href"/>
                        <Components.Input type='text' style={{width:"30%"}} name="captcha" value={captcha} onChange={e=>setCaptcha(e.target.value)} placeholder="Enter captcha" />
                       
                        <Components.Anchor onClick={(e)=>{e.preventDefault();setForget(true)}} href='/forgetpass'>Forgot your password?</Components.Anchor>
                        <Components.Button onClick={login}>Login</Components.Button><br />
                        {/* <Components.Button onClick={getData}>Home</Components.Button> */}
                        <img src={log} alt="register" width='500px' />
                    </Components.Form>
                    }
                </Components.SignInContainer>               
                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>
                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title>Welcome Back!</Components.Title>
                            <Components.Paragraph>
                                To keep connected with us please login with your personal info
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Login
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>
                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title>Hello, Friend!</Components.Title>
                            <Components.Paragraph>
                                Enter Your personal details and start journey with us
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Register
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </>
    )
}
export default RegisterLogin;
