import React,{useState} from 'react'
import Interviewinformation from '../Components/Interviewinformation';
import Interviewlist from '../Components/Interviewlist';
import './InterviewDetails.css';
import DashboardNavbar from './../Components/navbars/DashboardNavbar';
export default function InterviewDetails() {
    const [selectedJobDescription,setselectedJobDescription]=useState({id:"",title:"",generationDate:"",startDate:"",endDate:"",duration:"",type:"Select Type",position:"",
    jobDescription:""   });
   // const [thestate,setTheState]=useState(1);
    return (
      <div className='interviewdetail-wrapper'>
         <DashboardNavbar side={false}/>
          <div className='interviewlist'><Interviewlist setselectedJobDescription={setselectedJobDescription}/></div>
         <div className='interviewdescription'>
           <Interviewinformation selectedJobDescription={selectedJobDescription}/>
           </div>
      </div>
    )
  }