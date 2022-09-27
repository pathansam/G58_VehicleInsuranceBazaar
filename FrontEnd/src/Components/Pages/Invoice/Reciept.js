import React, { useEffect, useRef, useState } from "react"
import './reciept.css'
import logo from '../../../Components/img/vimslogo.jpg';
import logo2 from '../../../Components/img/vimslogo2.jpg';
import CustomerService from "../../../Services/CustomerService";
import Authorization from "../../../Authorization";
import ReactToPrint from "react-to-print";
export default function Reciept() {

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const componentRef = useRef()
  const [providerDetails,setProviderDetails]=useState({});
  const[vehicle,setVehicle]=useState({});
  const[user,setUser]=useState({});
  const[policy,setPolicy]=useState({});
  const[provider,setProvider]=useState({});

  const loadData=()=>{
    CustomerService.getVechileDetails()
    .then(res=>{
      console.log(res.data)
      setVehicle(res.data);
      setProviderDetails(res.data.policy.provider.user);
      setUser(Authorization.getUser())
      setPolicy(res.data.policy)
      setProvider(res.data.policy.provider)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    loadData();
  },[])

  // const print=()=>{
  //   window.print();
  // }
  return (
    <>
    <div className="receptcontainer" ref={componentRef} style={{width:"100%"}}>
      <div class="col-md-12" >

        <div class="row">

          <div class="receipt-main col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">

            <div class="row l1">

              <div class="receipt-header">

                <div class="col-xs-6 col-sm-6 col-md-6">
                <img className="logo3" src={logo} style={{width:"500px"}}/>
                  <div class="receipt-left">
                 
                    <img class="img-responsive img" alt="iamgurdeeposahan" src="https://bootdey.com/img/Content/avatar/avatar6.png" />
                  </div>

                </div>

                <div class="col-xs-6 text-justify rec">
                  <div class="receipt-right rec1">
                    <h5>{provider.companyName}</h5>
                    <p>+1 3649-6589 <i class="fa fa-phone"></i></p>
                    <p>company@gmail.com <i class="fa fa-envelope-o"></i></p>
                    <p>INDIA<i class="fa fa-location-arrow"></i></p>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="receipt-header receipt-header-mid">
                <div class="col-xs-8 text-left">
                  <div class="receipt-right">
                    <h5>{user.firstName+" "+user.lastName}</h5>
                    <p><b>Mobile :</b>{user.contactNumber}</p>
                    <p><b>Email :</b>{user.email}</p>
                    <p><b>Address :</b>{user.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 invo">
              <div class="receipt-left ">
                <h3>INVOICE # 102</h3>
              </div>
            </div>
            <div>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="col-md-9">
                      <b>Policy Name:</b>  {policy.policyName}<br/>
                      <b>Policy Type:</b>  {policy.policyType}<br/>
                      <b>Policy Date From:</b>  {vehicle.subscriptionDate} <b>To:</b> {vehicle.expiryDate}<br/>
                      <b>Vehicle Number:</b> {vehicle.vehicleNumber}<br/>
                      <b>Vehicle Type:</b> {vehicle.vehicleType}<br/>
                      <b>Registration Date:</b> {vehicle.registrationDate}<br/>
                    </td>
                    <td class="col-md-3"><i class="fa fa-inr"></i> {policy.policyPremium}/-</td>
                  </tr>
                  
                  <tr>
                    <td class="text-right">
                      <p>
                        <strong>Total Amount: </strong>
                      </p>
                      <p>
                        <strong>GST 18%: </strong>
                      </p>
                    </td>
                    <td>
                      <p>
                        <strong><i class="fa fa-inr"></i> {policy.policyPremium}/-</strong>
                      </p>
                      <p>
                        <strong><i class="fa fa-inr"></i> {policy.policyPremium*0.18}/-</strong>
                      </p>
                    </td>
                  </tr>
                  <tr>

                    <td class="text-right"><h2><strong>Total: </strong></h2></td>
                    <td class="text-left text-danger"><h2><strong><i class="fa fa-inr"></i>{policy.policyPremium*1.18} /-</strong></h2></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="row">
              <div class="receipt-header receipt-header-mid receipt-footer">
                <div class="col-xs-8">

                  <div class="receipt-right">
                    <p style={{ fontSize: "18px" }}><b>Date :</b>{date}</p>
                  </div>

                </div>
                {/* <button className="btn btn-primary" onClick={print}>
                Print
              </button> */}
                <ReactToPrint
            trigger={() => (
              <button className="btn btn-primary" style={{fontSize:"20px"}}>
                Print
              </button>
            )}
            content={() => componentRef.current}
          />
                <div class="p1">
                  <h5 style={{ color: "rgb(140, 140, 140)", fontSize: "25px", marginLeft: "65px" }}>Thanks for Visiting</h5>
                  <div className="logo1">
                    <img src={logo} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
