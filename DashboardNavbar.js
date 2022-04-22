import React,{useState} from 'react'
import './DashboardNavbar.css'
import { Navbar,Nav,Container } from 'react-bootstrap';
import { BsList,BsCaretDownFill } from "react-icons/bs";
import Sidebar from './Sidebar';
import userImg from '../../Assets/mainmenu/profile.jpg';
import { Link } from 'react-router-dom';
export default function DashboardNavbar(props) {
    const [sidebar,showSidebar]=useState(props.side);
const changesidebarstatus=()=>{
    showSidebar(!sidebar);  
}
const [showsignout,setShowSignOut]=useState(false);
const signOut=()=>{
    window.localStorage.removeItem('user_Id');
    console.log("signout",window.localStorage.getItem('user_Id'));
}
  return (
    <div className='recruiternavbar'> <Navbar >
    <Container >
        <BsList className='sidebarIcon' viewBox='0 0 20 13' onClick={changesidebarstatus}></BsList>
        <Navbar.Brand href="#home">rAIcruiter</Navbar.Brand>
        <Nav onClick={()=>{setShowSignOut(!showsignout)}}>
            <BsCaretDownFill className='bell-icon'></BsCaretDownFill>
        <img src={userImg} className='userImg'></img>
        </Nav>
       
    </Container>
    
    </Navbar>
    {sidebar==true ? <Sidebar sidebarclass='showsidebar'/>:<Sidebar sidebarclass='hidesidebar'/> }
    {showsignout==true ?<div className='signoutdiv'>
        <img src={userImg} className='userImgindiv'></img>
        <p>hammadalibu@gmail.com</p>
<h6>Hammad Ali</h6>
        <hr className='spearation-line'></hr>
        <Link to="/"><button className='signout-button' onClick={()=>{signOut()}}>Sign Out</button></Link></div>:(console.log("logout idv hided"))}
    
    </div>
  )
}
