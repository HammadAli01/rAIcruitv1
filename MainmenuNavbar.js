import React from 'react'
import './MainmenuNavbar.css';
import { Navbar,Nav,Container } from 'react-bootstrap';
import sitelogo from '../../Assets/mainmenu/sitelogo2.png';
import { Route, Link,Routes, BrowserRouter } from 'react-router-dom';

import Signin from './../Signin';
import Signup from './../Signup';
export default function MainmenuNavbar() {
    const scroller= (e)=> {
        var nav = document.getElementById('mynav');
        var navlink1=document.getElementById('navlink1');
        var navlink2=document.getElementById('navlink2');
        var navlink3=document.getElementById('navlink3');
        var navlink4=document.getElementById('navlink4');
        var navlink5=document.getElementById('navlink5');
        if (document.documentElement.scrollTop || document.body.scrollTop > window.innerHeight) {
              nav.classList.add("nav-colored");
              nav.classList.remove("nav-transparent");
              navlink1.classList.add("navlink-black");
              navlink1.classList.remove("navlink-white");
              navlink2.classList.add("navlink-black");
              navlink2.classList.remove("navlink-white");
              navlink3.classList.add("navlink-black");
              navlink3.classList.remove("navlink-white");
              navlink4.classList.add("navlink-black");
              navlink4.classList.remove("navlink-white");
              navlink5.classList.add("navlink-black");
              navlink5.classList.remove("navlink-white");
            } else {
             
              nav.classList.add("nav-transparent");
              nav.classList.remove("nav-colored");
              navlink1.classList.add("navlink-white");
              navlink1.classList.remove("navlink-black");
              navlink2.classList.add("navlink-white");
              navlink2.classList.remove("navlink-black");
              navlink3.classList.add("navlink-white");
              navlink3.classList.remove("navlink-black");
              navlink4.classList.add("navlink-white");
              navlink4.classList.remove("navlink-black");
              navlink5.classList.add("navlink-white");
              navlink5.classList.remove("navlink-black");
            }
    }
      window.addEventListener('scroll', scroller);
  return (
    <div className='mainnavbar'>
      
        <Navbar id="mynav">
    <Container >
        
    <Navbar.Brand href="#home"><img src={sitelogo} className='sitelogo'></img></Navbar.Brand>
        <Nav >
      {/* <Nav.Link to="#signup"  id='navlink1'>Home</Nav.Link>
        <Nav.Link href="#features" id='navlink2'>Features</Nav.Link>
        <Nav.Link href="#pricing" id='navlink3'>Instructions</Nav.Link>
        <Nav.Link href="#pricing" id='navlink4'>Contact us</Nav.Link>  */}
        
        <Link to="/" id='navlink1' className='navbar-nav navbar-light nav-link .navbar-expand mynav'>Home</Link>
        <Link to="/" id='navlink2' className='navbar-nav navbar-light nav-link .navbar-expand mynav' >Features</Link>
        <Link to="/" id='navlink3' className='navbar-nav navbar-light nav-link .navbar-expand mynav'>Instruction</Link>
        <Link to="/signup" id='navlink4' className='navbar-nav navbar-light nav-link .navbar-expand mynav'>Signup</Link>
       <Link to="/signin" id='navlink5' className='navbar-nav navbar-light nav-link .navbar-expand mynav'>Login</Link>
        </Nav>
    </Container>
    </Navbar>
    
    </div>
  )
}
