import styles  from './QuestionBank.module.css';
import './Questionbank.css';
import React,{useState,useEffect,useRef} from 'react'
import {Form,Container,Row,Col,Button,Modal,InputGroup,FormControl,Dropdown, DropdownButton,Accordion} from 'react-bootstrap'
import {BsArrowRightShort,BsSearch} from 'react-icons/bs'
import  axios  from 'axios'

export default function Questionbank() {
    const [categories,setCategories]=useState([]);
    const [questions,setQuestions]=useState([]);
    const [userQuestions,setUserQuestions]=useState([]);
    const [stem,setStem]=useState();
    const [question_weight,setQuestionWeightage]=useState(25);
    const [category,setCategory]=useState('');
    var count=1;
    //const loggeduser=JSON.parse(window.localStorage.getItem(user_Id));
    const loggeduser='hammadalibu@gmail.com';
    const [addcount,setAddCount]=useState(1);
    
    const [optionList,setoptionList]=useState([{id:count,optionText: '',optionWeightage: '25'}]);
    const [modalFormData, setModalFormData] = useState({
      id: '',
      stem: '',
      CategoryName: '',
      optionArray: [
          {
              id:'',
              optionText: '',
              optionWeightage: ''
          }
      ],
      username:'',
      question_weight:'',
  });
  const [addQuestionType,setAddQuestionType]=useState('close ended');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [search,setSearch]=useState('');
    const handleOptionChange = (name,val, index) => 
    {
      const list = [...optionList];
      list[index][name] = val;
      setoptionList(list);
    };
    const handleStemChange=(e)=>{
      setStem(e.target.value);
     }
 useEffect(()=>{
  addModalData();
  
 },[addcount]);
    const addModalData = async () => 
    {
      const list={};
      console.log("Stem is: ",stem);
      console.log("Option array is: ",optionList);
      list['stem']=stem;
      if(addQuestionType==='close ended')
      {
        list['optionArray']=optionList;
      }
      else{
        list['optionArray']=[{}];
      }


    list['CategoryName']=category;
    list['email']=loggeduser;
    list['question_weight']=question_weight;
    setModalFormData(list);
     //  event.preventDefault();
    if(!(modalFormData.stem===undefined || modalFormData.stem===''))
      {console.log("modal data in addatat ",list);
     //sending to api and refreshing
     const response = await axios.post("https://raicruittest.herokuapp.com/add/user/question", list).catch((err) => 
      {
        console.log("Error: ", err);
      });
      if (response)  {
        console.log("reponse by post question is",response.data);
        getUserQuestions();
        handleClose();
        setModalFormData({
          id: '',
          stem: '',
          CategoryName: '',
          optionArray: [
              {
                  id:'',
                  optionText: '',
                  optionWeightage: ''
              }
          ],
          username:'',
          question_weight:''
      });
        setoptionList([{id:count,optionText: '',optionWeightage: ''}]);
        setStem('');
        setQuestionWeightage(25);
      }
      
    
      // console.log("arrays after save called","modal fromm data: ",modalFormData,
      // "optionList:",optionList,"stem is:",stem);
      }
      else{
        console.log("modal data is empty");
      }
      
    }
    const handleAddQuestionSubmit=()=>{
      console.log("handleaddsubmit called");
     // validateAddQuestionForm();
      addModalData(); 
      setAddCount(addcount+1);
    }
    const handleRemoveClick = index => 
    {
      const list = [...optionList];
      list.splice(index, 1);
      setoptionList(list);
    };

  // handle click event of the Add button
    const handleAddClick = (id) => 
    {
      count=Math.ceil(Math.random()*99999999);
    setoptionList([...optionList, {id:count, optionText: '', optionWeightage: '25' }]);
    };
    const getCategories = async () => {
       console.log("get categories called"); 
       const response = await axios.post("https://raicruittest.herokuapp.com/Category/get/all").catch((err) => 
       { console.log("Error:", err); });
        if (response) { 
          console.log("cateogires got are",response.data); 
          setCategories(response.data); 
        } };
    const getQuestions = async () => 
    {
      console.log("get questions called");
      const response = await axios.get("https://raicruittest.herokuapp.com/get/all/question").catch((err) => {
        console.log("Error:", err);
      });
      if (response ) {
        console.log("response of adminques are",response.data.Questions);
        setQuestions(response.data.Questions);
      }
    };
    const getUserQuestions = async () => 
    {
      console.log("get user questions called");
      const response = await axios.get(`https://raicruittest.herokuapp.com/get/user/question?email=${loggeduser}`).catch((err) => 
      {
        console.log("Error:", err);
      });
      if (response ) 
      {
        console.log("response of userques are",response.data.Questions);
        setUserQuestions(response.data.Questions);
      }
    };
      const onDragStart = (event,nodeType, questionId,questionStem,currentOptions,categoryName,userEmail,questionWeightage) => 
      {
        console.log("Ondragstart called(question ID):",questionId," question stem: ",questionStem,
        "thisCurrentoptions: ",currentOptions,"categoryName",categoryName,"userEmail",userEmail);
        event.dataTransfer.setData('application/reactflow',nodeType);
        event.dataTransfer.setData('questionid',questionId);
        event.dataTransfer.setData('questionstem',questionStem);
        event.dataTransfer.setData('currentoptions',JSON.stringify(currentOptions));
        event.dataTransfer.setData('category',categoryName);
        event.dataTransfer.setData('userEmail',userEmail);
        event.dataTransfer.setData('questionweightage',questionWeightage);
        
        event.dataTransfer.effectAllowed = 'move';
      };
      const doubleCaller=(name)=>{
        setCategory(name);
        handleShow();
        
      }
      useEffect(() => {
        getCategories();
        getQuestions();
        getUserQuestions(); 

      },[]);
    return (
      <>
      <div className={styles.upperAdddiv}> 
        <div className={styles.addquestionDiv}>
         <div> <h3 className={styles.banktitle}>Question Bank</h3>
          < hr className={styles.dividerline}></hr>
          </div>
          <Accordion>
          {
          categories.map((category,index)=>{
            return(
            <Accordion.Item eventKey={index+""} >

              <Accordion.Header className={styles.accordion} id='accordion'> 
              <h4 className={styles.buttonHover}  > {category.name} </h4>
              </Accordion.Header>
            <Accordion.Body>
              <div className={styles.searchContainer}>
                
                <input className={styles.searchfield} type="text" placeholder= 'Search question' onChange={e=>setSearch(e.target.value)}></input>
                <BsSearch className={styles.searchIcon}></BsSearch>
                <Button variant="primary" onClick={(e)=>{handleShow(); setCategory(category.name)}} className={styles.addbutton}>+</Button> 
              
              </div>
              <div className={styles.questions}>
                {questions.filter(question=>(question.CategoryName===category.name))
                .filter(question=>(question.stem.toLowerCase().includes(search.toLowerCase())))
                .map(question =><div > <h5  className={styles.questionstyle} key={question.id} onDragStart={(event) => 
                onDragStart(event, 'default',question.id,question.stem,question.optionArray,category.name,"",question.question_weight)} draggable>
                  {question.stem}</h5></div>)}
                
                <p className={styles.userquestionheader}>User Questions</p>
                {
                  userQuestions.filter(question=>question.CategoryName===category.name)
                  .filter(question=>(question.stem.toLowerCase().includes(search.toLowerCase())))
                  .map(question => <h5 className={styles.questionstyle} key={question.id } onDragStart={(event) => 
                  onDragStart(event, 'default',question.id,question.stem,question.optionArray,category.name,question.email,question.question_weight)} draggable>
                  {question.stem}
                  </h5>)
                }
              </div>
            </Accordion.Body>
            </Accordion.Item>
          )})}
          </Accordion>
      </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="add-question-modal"
        onSubmit={handleAddQuestionSubmit}
      >
        <Modal.Header closeButton>
        <Modal.Title>Add Question</Modal.Title>
        </Modal.Header>
          <Form>
            <Modal.Body >      
                <InputGroup>
                    <InputGroup.Text>Question</InputGroup.Text>
                    <FormControl as="textarea" name="stem" placeholder="Write your question here" 
                    onChange={handleStemChange} value={stem} required/>
                </InputGroup>

                <DropdownButton id="dropdown-basic-button" title={question_weight}  name="question_weight"
                value={question_weight}  onSelect={e => setQuestionWeightage(e)} required className="newquestiondeightage">
                          <Dropdown.Item eventKey="25">25</Dropdown.Item>
                          <Dropdown.Item eventKey="50">50</Dropdown.Item>
                          <Dropdown.Item eventKey="75">75</Dropdown.Item>
                          <Dropdown.Item eventKey="100">100</Dropdown.Item>
                          
                      </DropdownButton>

                <label>Category Name: {category}</label><br/>
                <div className={styles.questionType}>
                <label className={styles.questionTypeLabel}>Select Question Type: </label>
                <DropdownButton className={styles.questionDropdown}  title={addQuestionType}  name="addQuestionType"
                value={addQuestionType}  onSelect={e => {setAddQuestionType(e) }}>
                  <Dropdown.Item eventKey="open ended">open ended</Dropdown.Item>
                  <Dropdown.Item eventKey="close ended">close ended</Dropdown.Item>
                </DropdownButton>
                </div>
{ addQuestionType==='close ended' &&
<div>
                <label>Options</label><br/>

                {optionList.map((T_option,i)=>(
                    <div key={T_option.id}>
                      <Form.Control  type="text" placeholder="Enter option here" name="optionText" value={T_option.optionText} 
                      onChange={e=> handleOptionChange(e.target.name,e.target.value,i)} required className="newquestioninputfield"/><br/> 
                      <h5>Select Option Weightage</h5>   
                      <DropdownButton id="dropdown-basic-button" title={T_option.optionWeightage}  name="optionWeightage"
                value={T_option.optionWeightage}  onSelect={e => handleOptionChange("optionWeightage",e, i)} required className="newquestiondeightage">
                          <Dropdown.Item eventKey="25">25</Dropdown.Item>
                          <Dropdown.Item eventKey="50">50</Dropdown.Item>
                          <Dropdown.Item eventKey="75">75</Dropdown.Item>
                          <Dropdown.Item eventKey="100">100</Dropdown.Item>
                          
                      </DropdownButton>
                      <div className="add-question-btn-box">
                  {optionList.length !== 1 && <button
                  
                    className="add-question-optionremoveButton"
                    onClick={() => handleRemoveClick(i)}>-</button>}
                  {optionList.length - 1 === i && <button className="add-question-optionaddbutton"
                  onClick={()=>handleAddClick(i)}>+</button>}
                </div>
                      </div>
                ))}
                </div>
}
                
            
            </Modal.Body>
          </Form>
        <Modal.Footer>
          <Button type="submit" onClick={handleAddQuestionSubmit} >Save</Button>
        </Modal.Footer>
      </Modal>
      </>
    )
}
//onClick={(e)=>{addModalData(); setAddCount(addcount+1)}}