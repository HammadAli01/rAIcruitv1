import React,{useState,useRef,useEffect,useCallback} from 'react'
import "./Interviewinformation.css"
import { DatePickerComponent, Inject, MaskedDateTime } from "@syncfusion/ej2-react-calendars";
import { Dropdown,DropdownButton } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
export default function Interviewinformation(props) {
  const navigation = useNavigate();
  const handlePageSubmit = useCallback(() => navigation('/designinterview', {replace: true}), [navigation]);
  console.log("prop is",props.selectedJobDescription);
  const dateValue= new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
  const [InterviewDetail,setInterviewDetail]=useState({
    id:1,
    title:"",
    generationDate:"",
    startDate:"",
    endDate:"",
    duration:"",
    type:"",
    position:"",
    jobDescription:""
  });
  //useState
  const [positionType,setPositionType]=useState();
  let temptype="Select Type",tempdetails={
    id:1,
    title:"",
    generationDate:"",
    startDate:"",
    endDate:"",
    duration:"",
    type:"",
    position:"",
    jobDescription:""
  };
  const [startDate,setStartDate]=useState(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()));
  const [endDate,setEndDate]=useState(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+1));
  
  let error;
  const [userErrors,setUserErrors]=useState({});
  //updating end date asa start date changes
 useEffect(()=>{
  console.log("start date is", new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate()));
  setEndDate(new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate()+1));
  },[startDate])
    tempdetails=props.selectedJobDescription;
console.log("id got is",tempdetails.id);
      //InterviewDetail.title=props.selectedJobDescription.title;
    //  InterviewDetail.location=props.selectedJobDescription.location;
    temptype=props.selectedJobDescription.type;
  
 
    
    //  InterviewDetail.position=props.selectedJobDescription.position;
    //  InterviewDetail.jobDescription=props.selectedJobDescription.jobDescription;
  // setCount(count + 1);
  // console.log("count is",count);
 

  // setStartDate(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()));
  // setEndDate(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+1));
  // setPositionType("Select Position");

useEffect(()=>{
change();
},[temptype])
const change=()=>{
  console.log("temp type is",temptype);
  setPositionType(temptype);
 }
 useEffect(()=>{
  updateinterview();
  },[tempdetails]);
  const updateinterview=()=>{
    setInterviewDetail(tempdetails);
    console.log("temp details in useeffect are",tempdetails);
    console.log("interviewdetails in useeffect are",InterviewDetail);
   }


  // const dateValue= new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
  // const [startDate,setStartDate]=useState(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()));
  // const [endDate,setEndDate]=useState(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+1));
  // const [positionType,setPositionType]=useState("Select Position");
  // const [InterviewDetail,setInterviewDetail]=useState({
  //   id:1,
  //   title:"",generationDate:"",startDate:"",endDate:"",location:"",type:"",position:"",jobDescription:""});

    const changeHandler=(e)=>{
      console.log("i called",e);
      setInterviewDetail({...InterviewDetail,[e.target.name]:e.target.value});
    }
    
    const checkErrors=()=>{
      error={
          jobTitleError:"",
          positionTitleError:"",
          positionTypeError:"",
          durationError:"",
          jobDescriptionError:"",
          sameDateError:""
      };
      let count=0;

     // console.log("userdata is",userData.userName.length);
      if(InterviewDetail.title.length==0){
          error.jobTitleError="Job title is required";
          count=count+1;
      }
      if(InterviewDetail.position.length==0)
      {
          error.positionTitleError="Job position title is required";
          count=count+1;
      }
      
      if(InterviewDetail.type=="Select Type")
      {
          error.positionTypeError="Type is required";
          count=count+1;
      }
      if(InterviewDetail.duration.length=='')
      {
          error.durationError="Duration is required";
          count=count+1;
      }
      if(InterviewDetail.jobDescription.length==0)
      {
          error.jobDescriptionError="Description is required";
          count=count+1;
      }
      if( InterviewDetail.startDate==InterviewDetail.endDate){
        //error.sameDateError="Start and end dates cannot be same";
        count=count+1;
      }

      if(count==0)
      {return true;
      }
      else{
          return false;
      }
  }
    const submitForm=(e)=>{
      InterviewDetail.type=positionType;
      InterviewDetail.startDate=startDate.getFullYear()+"-" +(startDate.getMonth()+1)+"-" + startDate.getDate();
      InterviewDetail.endDate=endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDate();
      InterviewDetail.generationDate=dateValue.getFullYear()+"-"+(dateValue.getMonth()+1)+"-"+dateValue.getDate();
     
      let errorResult=checkErrors();
      
      if(errorResult==false)
      {
        setUserErrors(error);
        console.log("Got error is",userErrors);
        console.log("Interview details are errored: ",InterviewDetail);
      }
      else{
        console.log("Interview details sent to api are: ",InterviewDetail);
        window.localStorage.setItem("interview_data",JSON.stringify(InterviewDetail));
        handlePageSubmit();
        // const response = await axios.post("/interview details", InterviewDetail).catch((err) => 
      // {
      //   alert("Error: ", err);
      // });

      // if (response) {
         setInterviewDetail({
          id:1,
          title:"",
          generationDate:"",
          startDate:"",
          endDate:"",
          duration:"",
          type:"",
          position:"",
          jobDescription:""
        });
      //}
        
        
      }
      
    }
    
      const interviewdate=document.getElementById("interviewdate");
      if(interviewdate!==null){
    interviewdate.addEventListener("keydown", function (e) {
      console.log("key pressed");
      e.preventDefault();
    });
  }

  return (
    <div className='parent'>
      <div className="herodiv"><h3 className='typed-out'>Achieve Your Hiring Goals</h3>
      <svg className="curvesvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 170"><path fill="#5de6de" fillOpacity="1" d="M0,64L120,90.7C240,117,480,171,720,170.7C960,171,1200,117,1320,90.7L1440,64L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg>
      
      </div>
      <div className="jobdiv" >
      <div className='basicdetails'>
        <h3 className='job-description-form-title'>Job Description Details</h3>
        <form>
          <div className="form-group">
            <label className="input-label"> Job Title</label>
            <input type="text" className="form-input" id="name-input"  value={InterviewDetail.title}
            placeholder="Description Title"  name="title" required onChange={(e)=>{changeHandler(e)}}/>      
            {userErrors.jobTitleError && <p className="field-error">{userErrors.jobTitleError}</p>}
          </div>

          <div className="form-group-dropdown1">
            <label className="input-label">Position Title</label>
            <input type="text" className="form-half-input" id="name-input" value={InterviewDetail.position}
            placeholder="Position"  name="position" required onChange={(e)=>{changeHandler(e)}}/>      
            {userErrors.positionTitleError && <p className="field-error">{userErrors.positionTitleError}</p>}
          </div>
          <div className="form-group-dropdown2">
            <label className="input-label"> Position Type</label>
          <DropdownButton className=''  title={positionType}  name="type" onSelect={(e)=>{setPositionType(e)}}
                 >
                  <Dropdown.Item eventKey="Full Time">Full Time</Dropdown.Item>
                  <Dropdown.Item eventKey="Part Time">Part Time</Dropdown.Item>
            </DropdownButton>    
            {userErrors.positionTypeError && <p className="field-error">{userErrors.positionTypeError}</p>}
          </div>
          <div className="form-group">
            <label className="input-label">Duration</label>
            <input type="text" className="form-input-time" value={InterviewDetail.duration} id="name-input" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
            placeholder="Hours/Minutes--05:30"  name="duration" required onChange={(e)=>{changeHandler(e)}}/>   
            {userErrors.durationError && <p className="field-error">{userErrors.durationError}</p>}
          </div>
          <div className="startdate">
            <label className="input-label">Start Date</label>
             <DatePickerComponent enableMask={true} placeholder='select date' name="startDate"
             value={startDate} min={dateValue} strictMode={true} onChange={(e)=>{setStartDate(e.value) }}
             required id="interviewdate"><Inject services={[MaskedDateTime]} /></DatePickerComponent>
           {userErrors.sameDateError && <p className="field-error">{userErrors.sameDateError}</p>}
          </div>
          <div className="enddate">
            <label className="input-label">End Date</label>
            
             <DatePickerComponent className="e-custom" enableMask={true} placeholder='select date' name="endDate"
             value={endDate} min={endDate} strictMode={true}  onChange={(e)=>{setEndDate(e.value)}}
             required id="interviewdate"><Inject services={[MaskedDateTime]} /></DatePickerComponent>
            <p className="field-error"></p>
          </div>
          
        </form>
        <div className="form-group">
           <button className="interviewsubmit-button" onClick={(e)=>{submitForm(e)}}>
             SUBMIT</button>
          </div>
      </div>
      <div className="descriptiondetail"></div>
     <form>
     <div className="description-form-group">
            <label className="description-input-label">JOB DESCRIPTION</label>
            <textarea  className="description-form-input"  value={InterviewDetail.jobDescription}
            placeholder="Description of the job"  name="jobDescription" required onChange={(e)=>{changeHandler(e)}}/>   
           {userErrors.jobDescriptionError && <p className="field-error">{userErrors.jobDescriptionError}</p>}
            </div>
      </form>
          </div>
          
    </div>
  )
}
