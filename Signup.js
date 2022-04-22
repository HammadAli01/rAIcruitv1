
import React,{useState,useCallback} from 'react';
import "./Signup.css";
import logo from '../Assets/mainmenu/bot.jpg';
import chat from '../Assets/mainmenu/signupimg.png';

import { BsFacebook,BsYoutube,BsWhatsapp,BsTwitter,BsInstagram } from "react-icons/bs";
import Signin from './Signin';
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
export default function Signup() {
    //Field states
    const navigation = useNavigate();
const [userData,setUserData]=useState({
    firstName:"",
    lastName:"",
    userEmail:"",
    userPassword:"",
    confirmPassword:"",
    userCompanyName:""
});
const changeHandler=(e)=>{
    setUserData({...userData,[e.target.name]:e.target.value});
}
//error states
let error;
const [userErrors,setUserErrors]=useState({});
const formSubmitHandler=async(e)=>{
    e.preventDefault();
    
    const errors=checkErrors();
    if(errors==true)
    {   setUserErrors(error);
        const user_data={
            email: userData.userEmail,
        company_name: userData.userCompanyName,
        
        first_name: userData.firstName,
        last_name:  userData.lastName,
        password:  userData.userPassword}
        console.log("call the api",user_data);
         const response =await Axios.post('https://raicruittest.herokuapp.com/user/create/', user_data).then(response => {
             console.log("first response",response.data); 
             if(response.data.user_email_status==false){
                error={
                    userFirstNameError:"",
                    userLastNameError:"",
                    userEmailError:"Email already exists. Try Login with this email",
                    userPasswordError:"",
                    confirmPasswordError:"",
                    userCompanyNameError:"",
                };
                setUserErrors(error);
             }
             else if(response.data.signup_status==true){
                window.localStorage.setItem('user_Id', JSON.stringify(user_data.email));
                console.log("stored is",JSON.stringify(response.data.user_id));
             setUserData({
                firstName:"",
                lastName:"",
              userEmail:"",
              userPassword:"",
              confirmPassword:"",
              userCompanyName:""
          });
          document.getElementById("password-input").value="";
          document.getElementById("confirm-password-input").value="";
          handlePageSubmit();
         }
        })
         .catch(error => {
             console.error('There was an error!', error);
         });
        
     
        

       
    }
    else{
        setUserErrors(error);
        console.log("Got error is",userErrors);
    }
   
}
const handlePageSubmit = useCallback(() => navigation('/dashboard', {replace: true}), [navigation]);

const checkErrors=()=>{
    error={
        userFirstNameError:"",
        userLastNameError:"",
        userEmailError:"",
        userPasswordError:"",
        confirmPasswordError:"",
        userCompanyNameError:"",
    };
    let count=0;
   // console.log("userdata is",userData.userName.length);
    if(userData.firstName.length==0){
        error.userFirstNameError="First name is required";
        count=count+1;
    }
    if(userData.lastName.length==0){
        error.userLastNameError="Last name is required";
        count=count+1;
    }
    if(userData.userEmail.length==0)
    {
        error.userEmailError="Email is required";
        count=count+1;
    }
    else if(!/\S+@\S+\.\S+/.test(userData.userEmail)){
        error.userEmailError="Enter a valid email";
        count=count+1;
    }
    if(userData.userPassword.length==0)
    {
        error.userPasswordError="Password is required";
        count=count+1;
    }
    if(userData.confirmPassword.length==0)
    {
        error.confirmPasswordError="Confirm password is required";
        count=count+1;
    }
    else if(userData.userPassword!==userData.confirmPassword)
    {
        error.confirmPasswordError="Confirm password does not match password";
        count=count+1;
    }
    if(userData.userCompanyName.length==0)
    {
        error.userCompanyNameError="Company Name is required";
        count=count+1;
    }
    if(count==0)
    {return true;
    }
    else{
        return false;
    }
}


    const labelclicked=(id)=>
    {
        console.log("catched id is ",id);
        document.getElementById(id).focus();
    }
    
  return (
    <div className='signupparent'>
        <div className="register-left">
            <h1 className='welcometag'>Welcome to rAIcruit</h1>
            <span className='welcometext'>Build intelligent virtual interview takers and forget your interview conducting process Recruit 33% faster</span>
            <img src={chat} className="chatimg"></img>
            <h3 className='supporttext'>Support Us On</h3>
            <div className='signuplogos'>
                <BsFacebook className='support-icon'></BsFacebook>
                <BsYoutube className='support-icon'></BsYoutube>
                <BsWhatsapp className='support-icon'></BsWhatsapp>
                <BsTwitter className='support-icon'></BsTwitter>
                <BsInstagram className='support-icon'></BsInstagram>
            </div>
        </div>
        <div className="register-right">
            <div className="signup-section__form" alt="logo">
                <img src={logo} className="logoimg"></img>
                <h2 className='newaccounttag'>Create New Account</h2>
                <form >
                    <div className="form-group">
                    
                        <input type="text" className="form-input" id="first-name-input"  value={userData.firstName}
                    placeholder=" "  name="firstName" required onChange={(e)=>{changeHandler(e)}}/>
                    <label className="form-label" onClick={e=>{labelclicked("first-name-input")}}>First Name</label>
                    {userErrors.userNameError && <p className="field-error">{userErrors.userNameError}</p>}
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-input" id="last-name-input"  value={userData.lastName}
                    placeholder=" "  name="lastName" required onChange={(e)=>{changeHandler(e)}}/>
                    <label className="form-label" onClick={e=>{labelclicked("last-name-input")}}>Last Name</label>
                    {userErrors.userNameError && <p className="field-error">{userErrors.userNameError}</p>}
                    </div>
                    <div class="form-group">
                        <input type="email" className="form-input" id="email-input" name="userEmail" value={userData.userEmail}
                        placeholder=" " required onChange={(e)=>{changeHandler(e)}}/>
                        <label className="form-label" onClick={e=>{labelclicked("email-input")}}>Email Address</label>
                        <p className="field-error">{userErrors.userEmailError}</p>
                    </div>
                    <div class="form-group">
                        <input type="password" className="form-input" id="password-input" name="userPassword" value={userData.password}
                        placeholder=" " required onChange={(e)=>{changeHandler(e)}}/>
                        <label className="form-label" onClick={e=>{labelclicked("password-input")}}>Password</label>
                        <p className="field-error">{userErrors.userPasswordError}</p>
                    </div>
                    <div class="form-group">
                        <input type="password" className="form-input" id="confirm-password-input" 
                        name="confirmPassword" placeholder=" " required onChange={(e)=>{changeHandler(e)}}/>
                        <label className="form-label" onClick={e=>{labelclicked("confirm-password-input")}}>Confirm password</label>
                        <p className="field-error">{userErrors.confirmPasswordError}</p>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-input" placeholder=" " id="company-input"  value={userData.userCompanyName}
                        name="userCompanyName" required onChange={(e)=>{changeHandler(e)}}/>
                        <label className="form-label" onClick={e=>{labelclicked("company-input")}}>Enter company Name</label>
                        <p className="field-error">{userErrors.userCompanyNameError}</p>
                    </div>
                    <div className="loginSection">
                       <Link to="/signin"> <a href="" className="logintext">Already have an account? Sign In</a></Link>
                    </div>
                    <button type="submit" value="Submit" className="submitButton" 
                    onClick={formSubmitHandler}>
                        Let's Get Started
                    </button>
                </form>
            </div>
         </div>
    </div>
  )
}

