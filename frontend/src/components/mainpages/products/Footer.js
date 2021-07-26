import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
  <>
  <div className='footer-container'>
        <div className= 'sec AboutUs'>
          <h2>About Us</h2>
          <p>We have understood what it means to be trusted by thousands of customers,and
             we intend on keeping that trust by continuing to provide you with the best
             products for affordable prices. We make it our responsibility to attend to your 
             requirements.The personalized experience that you can have at EZONE as a customer is unparalleled. </p>
        <ul className='sci'>
            <li>  
              <Link
                class='social-icon-link facebook'
                to=''
                target='_blank'
                aria-label='Facebook'
              >
                <i class='fab fa-facebook-f' />
              </Link>
            </li>


            <li>  
              <Link
                class='social-icon-link instagram'
                to=''
                target='_blank'
                aria-label='Instagram'
              >
                <i class='fab fa-instagram' />
              </Link>
            </li>


            <li> 
              <Link
                class='social-icon-link youtube'
                to=''
                target='_blank'
                aria-label='Youtube'
              >
                <i class='fab fa-youtube' />
              </Link>
            </li>

            <li> 
              <Link
                class='social-icon-link twitter'
                to=''
                target='_blank'
                aria-label='Twitter'
              >
                <i class='fab fa-twitter'/>
              </Link>
            </li>

            
            <li> 
            <Link
              class='social-icon-link twitter'
              to=''
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
            </li>    
        </ul>
      </div> 

      <div className='sec quickLinks'> 
        <h2>Quick Links</h2>
        <ul >
          <li><Link to='/'>About</Link></li>
          <li><Link to='/'>FAQ</Link></li>
          <li><Link to='/'>Privacy Policy</Link></li>
          <li><Link to='/'>Help</Link></li>   
          <li><Link to='/'>Teams & Conditions</Link></li>   
          <li><Link to='/'>Contact</Link></li>
        </ul> 
      </div>

      <div className='sec contact'>
        <h2> Contact Info</h2>
        <ul className='info'>
          <li>
            <span><i className="fa fa-map-marker" aria-hidden="true"></i></span>
            <span> No 647 Linda Street
            <br/>
            Phoenix Villa,Nuwara-Eliya<br/> Sri-Lanka </span>
          </li>

          <li>
            <span><i className="fa fa-phone" aria-hidden='true'></i></span>
           <p> <a href="tel:123456789">+94 714 6500 752</a><br/> 
           <a href="tel:123456789">+94 724 5654 980</a>
           </p>
          </li>

          <li>
            <span><i className="fa fa-envelope" aria-hidden='true'></i></span>
            <p> <a href='mailto: ezonepvt@gmail.com'>ezonepvt@gmail.com</a></p>
          </li>
        </ul>
      </div>
      <div className="copyrightText">
        <p> Copyright © 2021 Online Tutorials. All Right Reserved.</p>
      </div>
  </div>
</>     
  );
}

export default Footer;