import React from 'react'
import './Sidebar.css';
import userimg from '../../Assets/mainmenu/profile.jpg';
import { BsHouseFill,BsBricks,BsFillChatSquareTextFill,BsReverseLayoutTextSidebarReverse,BsStickies,BsFillPersonFill,BsGearFill } from "react-icons/bs";

import { Link } from 'react-router-dom';
export default function Sidebar(props) {
    
  return (
    <div className={props.sidebarclass}>
<div className='sidebar-header'>
  <img src={userimg}></img><div className='user-info'>
      <span className="user-name">Hammad Ali</span>
      <span className="user-role">Recruiter</span>
      </div>
   </div>
   
<div className='sidebaritems'>
  <ul><Link to="/dashboard" className='link-item'>
    <li class="sidebar-item">
      <BsHouseFill className="page-icon"></BsHouseFill>
      <span>Home</span>
    </li></Link>
    <Link to="/designinterview">
    <li class="sidebar-item">
    <BsBricks className="page-icon"></BsBricks>
     <span>Design Interview</span>
    </li></Link> 
    <Link to="/interviewdetails">
    <li class="sidebar-item">
    <BsFillChatSquareTextFill className="page-icon"></BsFillChatSquareTextFill>
    <span>Interview Detail</span> 
    </li></Link>
    <Link to="/sendemail">
    <li class="sidebar-item">
    <BsReverseLayoutTextSidebarReverse className="page-icon"></BsReverseLayoutTextSidebarReverse>
     <span>Email</span>
    </li></Link> 
    <Link to="/managebank">
    <li class="sidebar-item">
    <BsGearFill className="page-icon"></BsGearFill>
    <span>Manage Bank</span> 
    </li></Link>
    <Link to="/dashboard">
    <li class="sidebar-item">
      <BsStickies className="page-icon"></BsStickies>
      <span>Results</span>
    </li></Link> 
    <Link to="/userprofile">
    <li class="sidebar-item">
      <BsFillPersonFill className="page-icon"></BsFillPersonFill>
     <span>Profile</span>
    </li></Link> 
  </ul>
</div>
    </div>
  )
}
