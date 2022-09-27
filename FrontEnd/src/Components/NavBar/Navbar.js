import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import "./Button.css";



import { Link, useHistory } from 'react-router-dom';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import { NavLink } from "react-router-dom";
import Authorization from "../../Authorization";
import RoleNavbar from "./RoleNavbar";
const { Fragment } = require("react");
const Navbar = () => {
  const dispatch=useDispatch();
  const state = useSelector((state) => state);
  const history=useHistory();
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  
const logout=()=>{
  dispatch({type:"LogOut"});
  sessionStorage.clear();
  history.push("/");
  window.location.reload();
}

  return (
    <>
    <Fragment>
     
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo" >
          <h2 > 
            <span >V</span>ehicle
            <span>I</span>nsurance
            <span >B</span>azaar
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <NavLink style={{fontSize:"30px",color:"white"}} to="/">Home</NavLink>
            </li>
           { Authorization.IsLoggedIn()?<li>
            <NavLink style={{fontSize:"30px",color:"white"}} to="/profile" >Profile</NavLink>
              {/* <NavLink to={Authorization.IsLoggedIn()?"/profile":"/login"} >Profile</NavLink> */}
            </li>:""}
            <li>
              <NavLink style={{fontSize:"30px",color:"white"}} to="/policies">Policies</NavLink>
            </li>
            {/* <li>
              <NavLink to="/payment">Payment</NavLink>
            </li> */}
            <div className="login">
            <li onClick={Authorization.IsLoggedIn()?logout:""}>
            <NavLink style={{fontSize:"30px",color:"white"}} to={Authorization.IsLoggedIn()?"":"/login"}>
              {Authorization.IsLoggedIn()?"Logout":`Login/Register`}
              </NavLink>
            </li>
            </div>
            <div>
            {Authorization.IsLoggedIn()?
            <li style={{color:"cyan"}}>
                  Hi, {Authorization.getName()}
            </li> :""}          
            </div>
           
          </ul>
        </div>
       
       <div>
           
         <RoleNavbar />
          
        </div>
        {/* 3rd social media links */}
        {/* <div className="social-media">
          <ul className="social-media-desktop">
            <li>
              <a
                href="https://www.facebook.com">
                <FaFacebookSquare className="facebook" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/">
                <FaInstagramSquare className="instagram" />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com">
                <FaYoutubeSquare className="youtube" />
              </a>
            </li>
          </ul>
          
          {/* hamburget menu start  *
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </a>
           
          </div>
        </div> */}
      </nav>
     
      </Fragment>
    </>
  );
};

export default Navbar;