
import React, { useEffect, useState } from 'react'
import CustomerService from '../../../Services/CustomerService';
import './payment.css'
import chip from '../../../Components/img/chip.png'
import visa from '../../../Components/img/visa.png'
import { Details } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
export const Payment = () => {
    const history=useHistory()
    const v = {
        cardNumber: "#################",
        cardHolder: "full Name",
        mdate: "month",
        myear: "year"
    }
    const [payment, setPayment] = useState(v);
    const initailValues = {
        cardNumber: "",
        cardHolder: "",
        amount: sessionStorage.getItem("policy").policyPremium,
        mdate: "",
        myear: "",
        cvv: ""
    }
    const [formValues, setFormValues] = useState(initailValues);
    const [formErrors, setFormErrors] = useState({});


    const handleChange = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target;
        setFormValues({
            ...formValues, [name]: value
        })

        setPayment({
            ...payment, [name]: value
        })

    }
    useEffect(() => {
        setFormErrors(validate(formValues));
    }, [formValues])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(Object.keys(formErrors).length===0){
            CustomerService.doPayment(payment)
            .then(res => {
                console.log(res.data)
                sessionStorage.removeItem("policyId");
                sessionStorage.removeItem("policy");
                toast.success("Policy Subscribed ",1000)
                history.push("/reciept")

            })
            .catch(err => {
                console.log(err)
            })
        }
        else{
            toast.error("please check payment details",1000);
        }
        
    }

    const validate = (values) => {
        const errors = {
        };
        const regex = /^\d{16}$/;
        if (!values.cardNumber.match(regex)) {
            errors.cardNumber = "please check your card Number"
        }
        return errors;
    }

    return ( 
        <div>
            <div class="container1">
                <div class="card-container1">
                    <div class="front">
                        <div class="image">
                            <img src={chip} alt="" />
                            <img src={visa} alt="" />
                        </div>
                        <div class="card-number-box">{payment.cardNumber}</div>
                        <div class="flexbox">
                            <div class="box">
                                <span>card holder Name</span>
                                <div class="card-holder-name">{payment.cardHolder}</div>
                            </div>

                            <div class="box">
                                <span>expires</span>
                                <div class="expiration">
                                    <span class="exp-month">{payment.mdate}</span>
                                    <span class="exp-year">{payment.myear}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="back">
                        <div class="stripe"></div>
                        <div class="box">
                            <span>cvv</span>
                            <div class="cvv-box"></div>
                            <img src="image/visa.png" alt="" />
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div class="inputBox">
                        <span>card number</span>
                        <input name='cardNumber' onChange={handleChange} value={formValues.cardNumber} type="text" class="card-number-input" />
                        <p style={{ color: "red" }}>{formErrors.cardNumber}</p>
                    </div>
                    <div class="inputBox">
                        <span>card holder</span>
                        <input name='cardHolder' onChange={handleChange} required  value={formValues.cardHolder} type="text" class="card-holder-input" />
                    </div>
                    <div class="flexbox">
                        <div class="inputBox">
                            <span>expiration mm</span>
                            <select name="mdate" required onChange={handleChange} id="" class="month-input">
                                <option value="month" selected disabled>month</option>
                                <option value="1">01</option>
                                <option value="2">02</option>
                                <option value="3">03</option>
                                <option value="4">04</option>
                                <option value="5">05</option>
                                <option value="6">06</option>
                                <option value="7">07</option>
                                <option value="8">08</option>
                                <option value="9">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                        <div class="inputBox">
                            <span>expiration yy</span>
                            <select name="myear" required onChange={handleChange} id="" class="year-input">
                                <option value="year" selected disabled>year</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                            </select>
                            
                        </div>
                        <div class="inputBox">
                            <span>cvv</span>
                            <input name='cvv' onChange={handleChange} value={formValues.cvv} type="password" minLength="3" maxLength="3" class="cvv-input" />
                        </div>

                    </div>
                    <div class="inputBox">
                        <span>Amount</span>
                        <input name='amount' value={1.18*JSON.parse(sessionStorage.getItem("policy")).policyPremium} readOnly type="text" class="card-holder-input" />
                        <p style={{ color: "black" }}>Gst amount {(0.18*JSON.parse(sessionStorage.getItem("policy")).policyPremium)}</p>
                                                        
                    </div>
                    <input  type="submit" value="submit" class="submit-btn" />
                </form>

            </div>
        </div>


    )

}
