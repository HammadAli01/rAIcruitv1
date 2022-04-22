import React,{useState,useCallback,useRef,useEffect} from 'react';
import "./SendEmail.css";
import DashboardNavbar from '../Components/navbars/DashboardNavbar';
import * as XLSX from "xlsx";
import { BsFillPersonFill,BsEnvelopeOpenFill,BsEnvelopeFill,BsMastodon } from "react-icons/bs";
import { Toast } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
export default function SendEmail() {
  const logged_user=window.localStorage.getItem('user_Id');
  const navigation = useNavigate();
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  const [showB, setShowB] = useState(false);
  const toggleShowB = () => setShowB(!showB);
  const [showC, setShowC] = useState(false);
  const toggleShowC = () => setShowC(!showC);
  const [showD, setShowD] = useState(false);
  const toggleShowD = () => setShowD(!showD);
  const invalidEmails=useRef(0);
  const duplicateEmails=useRef(0);
  const [emailData,setEmailData]=useState({receiverEmails:"",senderName:"",senderEmail:"hammadalibu@gmail.com",emailSubject:"",emailMessage:""});
const current_interview_id=useRef(undefined);
  const candidates=useRef([]);
  const [senderEmailError,setSenderEmailError]=useState();
  const selected={id:1,title:"AThis is the default title1",generationDate:"02/11/2017",startDate:"12/04/2021",endDate:"12/06/2021",location:"Islamabad",type:"Full Time",position:"Management",jobDescription:"Lorem ipsum dolor sit amet, isis consectetur adipiscing elit, sed do eiusmod tempor ..."   };
  const [fileheader,setFileHeader]=useState("email");
  let isfileselected=false;
  const currentid=useRef();
  const changeHandler=(e)=>{
      setEmailData({...emailData,[e.target.name]:e.target.value});
    };
  const checkSenderEmailError=()=>{
   
    if(emailData.senderEmail=="")
    {
      setSenderEmailError("Required");
      return false;
    }
    else
    {
      if(!/\S+@\S+\.\S+/.test(emailData.senderEmail)){ setSenderEmailError("Invalid email");
      return false; 
    }
      else
      {
      return true;
      }
    }
}

useEffect(() => {

  current_interview_id.current=window.localStorage.getItem("current_Interview");
  if(current_interview_id.current==undefined || current_interview_id.current==null){
    alert("Kindly design an interview first");
    handlePageSubmit();
  }
  console.log("send email loaded",current_interview_id.current);
  getInterviewID();
  //store in localhost user data if response is correct  checkData( params.get('interviewid'),params.get('userid'));
});
const getInterviewID=async()=>{
  const response = await axios.get(`https://raicruittest.herokuapp.com/Interview/get?email=${logged_user}&title=${current_interview_id.current}`).catch((err) => 
  {
    alert("Error: ", err);
  });
  if (response)  {
    console.log("reponse by get interview id is",response);
    currentid.current=response.data.id;
    console.log("current interview id is",currentid.current);
    }
   
  }

  const sendDataToAPI=async(e,all_candidates,email_msg)=>{
    emailData.receiverEmails=all_candidates;
    emailData.emailMessage=email_msg;
   // console.log("email data",emailData);
  //sender_name,interview_id,emailList,subject,body

  const email_data_sent={
sender_name:emailData.senderEmail,
interview_id: currentid.current,
emailList:emailData.receiverEmails,
subject:emailData.emailSubject,
body:emailData.emailMessage,
  }
  console.log("TO_API: for email",email_data_sent);
    //call api
    const response = await axios.post("https://raicruittest.herokuapp.com/add/email", email_data_sent).catch((err) => 
        {
          alert("Error: ", err);
        });
        if (response)  {
          console.log("reponse by send email is",response);
          if(response.data.Message=="successfully sent emails to all applicant"){
            console.log("sab sae");
            //resetting fields and states
    invalidEmails.current=0;
    duplicateEmails.current=0;
    emailData.receiverEmails="";
    emailData.senderName="";
    emailData.senderEmail="NOT USED";
    emailData.emailSubject="";
    emailData.emailMessage="";
    candidates.current=[];
    setSenderEmailError('');
    isfileselected=false;
    // console.log("invalid emails",invalidEmails.current,"duplicate are",duplicateEmails.current,"email data",emailData,
    // "candidates are",candidates.current,"sender error",senderEmailError,"file selected",isfileselected );
    e.target.reset();
    handlePageSubmit();
          }
         
        }
    
    
  }
  const handlePageSubmit = useCallback(() => navigation('/dashboard', {replace: true}), [navigation]);
  const sendmail=(e)=> {
    let emailmsg=emailData.emailMessage;
   
    const res=checkSenderEmailError();
    e.preventDefault();
    if(res==true && (candidates.current.length > 0))
    {
      if(invalidEmails.current>=1)
      {
        let confirmres=window.confirm(invalidEmails.current+" Invalid emails found in the file you uploaded \n Would you like to proceed");
        if(confirmres)
        {
        //   emailData.receiverEmails=candidates.current;
        //  console.log("email data",emailData);
        //   e.target.reset();
          sendDataToAPI(e,candidates.current,emailmsg);
        }
        else{
          toggleShowD();
          
        //  alert("upload file again");
        }
      }else
      {
   // alert("Duplicate emails found are => "+duplicateEmails.current+"\n Duplicate emails are not accepted");
   //console.log("invlaid emails are",invalidEmails.current);
        toggleShowA();
        sendDataToAPI(e,candidates.current,emailmsg);
      }
      
    }
    else{
      if(res==false)
      {
        console.log("Kindly enter correct sender email",senderEmailError);
      }
      else if(isfileselected==false){
        // alert("No file uploaded\nKindly upload a xml file with candidates emails");
        toggleShowB();
      }
      else if(isfileselected==true)
      {
        if(candidates.current.length <= 0){
          toggleShowC();
          
          //alert(candidates.current.length+" candidates emails found \n upload a xml file with candidates emails again");
      }
    }
}  }
  const readExcel = (file) => {
    invalidEmails.current=0;
    isfileselected=true;
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];
        setFileHeader(ws.A1.h);

        const data = XLSX.utils.sheet_to_json(ws);
       
        resolve(data);
        
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
        //console.log(ws);
          for(var i=0;i<d.length;i++)
          { if(/\S+@\S+\.\S+/.test(d[i][fileheader])){  
            let isExistingEmail=false;
            candidates.current.map((candidate)=>{
             
              if(candidate==d[i][fileheader]){
                isExistingEmail=true;
              }
              else{}
              }); 
            if(isExistingEmail==false)
            {
              candidates.current[i]=d[i][fileheader];
            }
            else{
              duplicateEmails.current=duplicateEmails.current+1;
            }
          }
            else{
              invalidEmails.current=invalidEmails.current+1;
            }
          }
        });};
  return(
      <><DashboardNavbar side={false}/>
      <div className="sendemailparent">
        
          <form className='emailtemplateform' onSubmit={sendmail}>
                  <h2 className='formheader'>Email Details</h2>
                      <div className='fieldgroup'>
                      
                          <input className='emailinput' type="text" placeholder="sender Name"  name="senderName" onChange={(e)=>{changeHandler(e)}}/>
                          <i className="inputicon"><BsFillPersonFill/></i>
                      </div>
                      <div className='fieldgroup'>
                      
                          <input className='emailinput' type="email"  placeholder="sender Email Address" name="senderEmail" onChange={(e)=>{changeHandler(e)}}/>
                          <i className="inputicon"><BsEnvelopeOpenFill/></i>
                      {senderEmailError && <p className="emailerror">{senderEmailError}</p>}
                      </div>
                      <div className='fieldgroup'>
                      
                          <input className='emailinput' type="text"  placeholder="Subject" name="emailSubject" onChange={(e)=>{changeHandler(e)}}/>
                          <i className="inputicon"><BsEnvelopeFill/></i>
                      </div>
                      <div className='fieldgroup'>
                      
                          <textarea className='emailmessageinput' id="emailmsg"  placeholder="Your message" name="emailMessage" onChange={(e)=>{changeHandler(e)}}/>
                          <i className="inputiconmsg"><BsMastodon/></i>
                      </div>
                      <div >
                      <div className='fieldgroup'>
                      <i className="inputicon"></i>
                          <input className='fileinput' type="file" accept='.xlsx' placeholder="Upload File"  name="receiverEmail" 
                          onChange={(e) => {
                              const file = e.target.files[0];
                              readExcel(file);
                            }}
                          />
                          
                      </div>
                          <input type="submit"  value="Submit" className='emaildatasubmitbutton'></input>
                      </div>
                  
              </form>
              <div className='sendemailtoasts'>
              <Toast show={showA} onClose={toggleShowA} className='toast1' position='bottom-center' delay={2000} autohide >
          <Toast.Header>
            {/* <img 
              src="" 
              className="rounded me-2"
              alt="Notification"
            /> */}
            <strong className="me-auto">Notification</strong>
            <small>now</small>
          </Toast.Header>
          <Toast.Body>Duplicate emails found are {duplicateEmails.current}<br/> Duplicate emails are not accepted</Toast.Body>
        </Toast>
        <Toast show={showB} onClose={toggleShowB} className='toast1' position='bottom-center' delay={2000} autohide >
          <Toast.Header>
            {/* <img 
              src="" 
              className="rounded me-2"
              alt="Notification"
            /> */}
            <strong className="me-auto">Message</strong>
            <small>now</small>
          </Toast.Header>
          <Toast.Body>No file uploaded<br/>Kindly upload a xml file with candidates emails</Toast.Body>
        </Toast>
        <Toast show={showC} onClose={toggleShowC} className='toast1' position='bottom-center' delay={2000} autohide >
          <Toast.Header>
            {/* <img 
              src="" 
              className="rounded me-2"
              alt="Notification"
            /> */}
            <strong className="me-auto">Message</strong>
            <small>now</small>
          </Toast.Header>
          <Toast.Body>{candidates.current.length} candidates emails found <br/> upload a xml file with candidates emails again</Toast.Body>
        </Toast>
        <Toast show={showD} onClose={toggleShowD} className='toast1' position='bottom-center' delay={2000} autohide >
          <Toast.Header>
            {/* <img 
              src="" 
              className="rounded me-2"
              alt="Notification"
            /> */}
            <strong className="me-auto">Message</strong>
            <small>now</small>
          </Toast.Header>
          <Toast.Body> Kindly Upload File Again </Toast.Body>
        </Toast>
        </div>
      </div>
      
      </> 
      )
}