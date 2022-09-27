
import React, { useEffect } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { toast } from "react-toastify";




const Captcha=()=>{


   const doSubmit = (e) => {
        let user_captcha = document.getElementById('user_captcha_input').value;
        e.preventDefault();
        if (validateCaptcha(user_captcha)===true) {
            toast.success('Captcha Matched',1000);
            loadCaptchaEnginge(6); 
            document.getElementById('user_captcha_input').value = "";
        }
 
        else {
            toast.error('Captcha Does Not Match',1000);
            document.getElementById('user_captcha_input').value = "";
        }
    };

        useEffect(()=>loadCaptchaEnginge(6))
        return (<div>
            <div className="container">
                <div className="form-group">
 
                    <div className="col" style={{size:15}}>
                       
                    </div>
                   <input class="icon-refresh" style={{height:30,margin:"0 0" ,fontSize:15}} onClick={(e)=>loadCaptchaEnginge(6)} type="submit" value="Refresh" name="Test"/>
                    <div className="col mt-3">
                        <div><input placeholder="Enter Captcha Value" id="user_captcha_input" name="user_captcha_input" type="text"></input></div>
                    </div>
 
                    <div className="col mt-3">
                        <div><button class="btn btn-primary" onClick={(e) =>{ e.preventDefault(); doSubmit(e)}}>Submit</button></div>
                    </div>
                      
                </div>
 
            </div>
        </div>);

}

export default Captcha;