import React from 'react'
import "./Mainmenu.css"
import MainmenuNavbar from '../Components/navbars/MainmenuNavbar'
import curvyimg from '../Assets/mainmenu/curve.png'
import sideimg from '../Assets/mainmenu/mainmenuimg1.PNG'
import wave1 from '../Assets/mainmenu/wave1.png';
import wave2 from '../Assets/mainmenu/wave2.png';
import review1 from '../Assets/mainmenu/review1.PNG';
import review2 from '../Assets/mainmenu/review2.PNG';
import review3 from '../Assets/mainmenu/review3.PNG';
import { AiOutlineFileSearch,AiFillSetting,AiFillClockCircle,AiOutlineLineChart } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { Carousel,CarouselItem,button } from 'react-bootstrap'
export default function Mainmenu() {
  
  
  return (
    <div className='mainParentdiv'>
      
      <div className='mainnavbardiv' id="navbardiv" ><MainmenuNavbar/></div>
      <div className='mainbackground'>
      <ul class="circles"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
      <div className='herocontent'>
         <h1>Skyrocket Your Hiring</h1>
         <p>The best recruiting platform for fast and efficient hiring.</p>   
         <Link to="/signup"><button>Let's Start</button></Link>
      </div>
      <img src={curvyimg} className='curvyimg'></img>
      </div>
      <div className='secondpage'>
      <div className='spchild'>
        <h5>FAST AND EFFICIENT</h5>
        <h2>Achieve Hiring Goals With Ease</h2>
        <p>What if you could spend 100% of your time speaking<br/>with amazing talent and forget everything else?</p>
        <p>With XOR's talent platform, we automate the most<br/>repetitive tasks so you can focus on hiring.<br/><br/>
Here's how we do it.</p>
<Link to="/"><button>Get To Know Us</button></Link>
      </div>
      <div><img src={sideimg}></img></div>
      </div>
      <div className='thirdpage'>
<img src={wave1} alt="wave1" className='wave1'></img>
      <h2>The Formula for Fast and Efficient Hiring</h2>
        <Carousel>
          
    <Carousel.Item >
    <img  className="d-block w-100" src="//www.xor.ai/hubfs/raw_assets/public/theme-challenge%20Birch%201-28-21/images/strategy-icon-v2.svg" alt="recruiting automation platform" class="img-foreground"/>
      
      <Carousel.Caption>
        <h3>Automate Workflows</h3>
        <p>We take care of repetitive task<br/> so you can focus on making the best hire</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item >
    <img className="d-block w-100" src="//www.xor.ai/hubfs/raw_assets/public/theme-challenge%20Birch%201-28-21/images/design-icon-v2.svg" alt="recruiting automation software" class="img-foreground"/>
      <Carousel.Caption>
        <h3>Recruit Virtually</h3>
        <p>Find and nurture talent from anywhere with<br/> virtual hiring </p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
    <img className="d-block w-100" src="//www.xor.ai/hubfs/raw_assets/public/theme-challenge%20Birch%201-28-21/images/design-icon-v2.svg" alt="recruiting automation software" class="img-foreground"/>
      <Carousel.Caption>
        <h3>Increase Engagement</h3>
        <p>Convert talent faster using email <br/>and the apps your candidates love.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  <img src={wave2} alt="wave2" className='wave2'></img>
      </div>
      <div className='fourth-page'>
        <h1> Create Amazing Hiring Results</h1>
        <div className='cards'>
          <div className='card'>
            <AiOutlineFileSearch className='card-icon'></AiOutlineFileSearch>
            <h3>33% Faster<br/> recruiting</h3>
            <p><span>More candidate responses in<br/> less time means faster hiring</span></p>
          </div>
          <div className='card'>
            <AiFillSetting className='card-icon'></AiFillSetting>
            <h3>50% More<br/>Efficiency</h3>
            <p><span>Robust automation means<br/> less time spent by recruiters<br/> on unqualified talent</span></p>
          </div>
          <div className='card'>
            <AiOutlineLineChart className='card-icon'></AiOutlineLineChart>
            <h3>90% Candidate<br/> Satisfaction</h3>
            <p><span>Candidates surveyed love the <br/>24/7, mobile-first hiring<br/> experience</span></p>
          </div>
        </div>
      </div>
      <div className='reviewpage'>
      <Carousel fade={true}>
        <Carousel.Item>
          <img
            className="d-block w-100 reviewimg"
            src={review1}
            alt="First slide"
          />
          <h5>Chloe Ali</h5>
          <h6>Recruiter</h6>
          </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 reviewimg"
            src={review2}
            alt="Second slide"
          />
          <h5>Leah troy</h5>
          <h6>Recruiter</h6>
        
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 reviewimg"
            src={review3}
            alt="Third slide"
          />
          <h5>Ben Lee</h5>
          <h6>Recruiter</h6>
        
        </Carousel.Item>
      </Carousel>
    </div>
    <div className='footer'>
      <div className='middleform'>
        <h2>Grow More With Our Goals</h2>
        <p><span>We are ready to help you anytime.</span></p>
        <Link to="/signup"> <button>Join Today</button></Link>
      </div>
      <div className='footerbottom'>
        <div className='footerleft'>
          <h1>rAIcruit</h1>
          <h3>333 West San Carlos Street, San Jose, CA 95110, United States</h3>
          <div className='footerbutton'>
          <button>F</button>
          <button>In</button>
          <button>T</button>
          <button>M</button>
        </div>
        </div>
        
        <div className='footerright'>
          <div className='footersubright'>
          <h4>Text Recruiting</h4> 
          <h4>Candidate Screening</h4>
          <h4>Interview Scheduling</h4>
          <h4>Interview designing</h4></div>
          <div className='footersubleft'> 
          <h4>Interview timings</h4>
          <h4>Email sending</h4>
          <h4>Contact Us</h4>
          <h4>How to Guide</h4></div>
          <h4>Features</h4>
        </div>
      </div>
    </div>
  </div>
  )
}
