import React from 'react'
import DashboardNavbar from '../Components/navbars/DashboardNavbar';
 import Questionbank from '../Components/Questionbank';
 import DesignFlow from '../Components/DesignFlow';
import './Designinterview.css'
export default function Designinterview() {
 // alert("Open project-initial-3 for this module testing");
    return (
    <div className="design-wrapper">
    <DashboardNavbar side={false}/>
    
        <div className="question">
        <Questionbank/>
        </div>
        <div className="interview">
        <DesignFlow/>
        </div>
        
    </div>
  )
}
