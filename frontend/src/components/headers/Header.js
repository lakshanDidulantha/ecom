import React, {useContext,useEffect, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import '../../styles/Navbar.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function Header() {
    const [click , setClick] =useState(false);
    const[button ,setButton]= useState(true);
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    })
    const handleClick =()=> setClick(!click);
    const closeMobileMenu=() => setClick(false);

    const showButton=()=>{
        if(window.innerWidth<=960){
            setButton(false)
        }else{
            setButton(true)
        }
    };

    useEffect(()=>{
        showButton()
    },[]);

    window.addEventListener('resize',showButton);


    const logoutUser = async () =>{
        await axiosInstance.get('/user/logout')        
        window.location.href = "/";
    }

    return (
    <><ToastContainer/>
        <nav className="navbar">
            
        <div className="navbar-container">
          <Link to ="/" className="navbar-logo" onClick={closeMobileMenu}>
          {isAdmin ? 'ADMIN' : 'EZONE'} <i className='fab fa-typo3'></i>
          </Link>  

          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

          <ul className={click ? 'nav-menu active': 'nav-menu'}>

              <li className ='nav-item'>
                  <Link to ='/' className='nav-links' onClick={closeMobileMenu}> {isAdmin ? 'Products' : 'Shop'} </Link>
              </li>

              {
                isAdmin ? '' :

              <li className="nav-item"  onClick={closeMobileMenu}>
                        <Link to="/cart">
                            <div className="nav-links">
                                <i className="fas fa-shopping-cart position-relative" aria-hidden="true">
                                    <span className="position-absolute"
                                    style={{
                                        padding: '3px 7px',
                                        background: '#ed143dc2',
                                        borderRadius: '50%',
                                        top: '-20px',
                                        right: '-25px',
                                        color: 'white',
                                        fontSize: '14px'
                                    }}>
                                        {cart.length}
                                    </span>
                                </i> Cart
                            </div>
                        </Link>
                    </li> 
             }  
            {
            isAdmin &&
                <>
                    <li className="nav-item"><Link to="/create_product"  className='nav-links'  onClick={closeMobileMenu}>Create Product</Link></li>
                    <li className="nav-item"><Link to="/category"  className='nav-links'  onClick={closeMobileMenu}>Categories</Link></li>
                </>
            } 

            {
                isLogged ? 
                <>
                    <li className="nav-item"><Link to="/history" className='nav-links'  onClick={closeMobileMenu}>History</Link></li>
                    <li className="nav-item"><Link to="/" onClick={logoutUser} className='nav-links' >Logout</Link></li>
                </> 
            
            : 
            
            <li className="nav-item"><Link to="/login" className='nav-links'  onClick={closeMobileMenu}>Login ✥ Register</Link></li>
            }
          </ul>
        </div>
        </nav>   </>
 
);
}


export default Header;