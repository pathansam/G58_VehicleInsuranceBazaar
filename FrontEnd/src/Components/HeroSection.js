import React from "react";
//import { Button } from "./Button";
import './HeroSection.css';
import '../App.css';
import why from '../Components/img/why.svg'
import relax from '../Components/img/relax.svg'
function HeroSection(){
    return(
     <div>
          {/* hero section  */}
      <section className="hero-section">
      </section>
        <div className="best-place">
             <div className="container">
                <div className="left-block">
                    <div className="txt-block">What makes<br/> 
                        <span>Insurance Bazaar</span> the<br/> <span>best place</span> to buy<br/> <span>insurance</span> in <br className="hide-big"/> India?
                        <img src={why} alt="whatMakesInsurance" height='500px'/>
                    </div>
                    <div className="right-block top-0">
                        <div className="info-box ">
                            <span className="top-icon"></span>
                                <p className="head">Customer Trust</p>
                                <p className="copy">customers trust us &amp; have bought their insurance on InsuranceBazaar</p>
                        </div>
                        <div className="info-box insurer">
                                <span className="top-icon"></span>
                                <p className="head">Many Insurers</p>
                                <p className="copy">partnered with us so that you can compare easily &amp; transparently</p>
                        </div>
                        <div className="info-box lowest-price">
                                <span className="top-icon"></span>
                                <p className="head">The Best Price</p>
                                <p className="copy">for all insurance plans available online</p>
                        </div>
                        
                        <div className="info-box claims">
                                <span className="top-icon"></span>
                                <p className="head">Claims</p>
                                <p className="copy">support built in with every policy for help, when you need it the most</p>
                        </div>
                        <div classNameName="img">
                            <img src={relax} alt="whatMakesInsurance" />
                        </div>
                    </div>
                </div>
             </div>
        </div>
        </div>
    );
}
export default HeroSection;