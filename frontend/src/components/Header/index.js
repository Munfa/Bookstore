import React, { useEffect, useState } from 'react';
import './style.css';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropDownMenu
} from '../MaterialUI';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/auth.actions';

/**
* @author
* @function Header
**/

const Header = (props) => {

  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const userLogin = () => {
    dispatch(login({ email, password }));
  }

  useEffect(() => {
    if(auth.authenticate){
      setLoginModal(false);
    }
  }, [auth.authenticate]);

  const renderLoggedInMenu = () => {
    return (
      <DropDownMenu 
            menu={
              <a className="fullName"> {auth.user.fullname} </a>
            }
            menus={[
              {label: 'My Profile', href:'', icon:null},
              {label: 'Orders', href:'', icon:null},
              {label: 'Wishlist', href:'', icon:null},
              {label: 'Notifications', href:'', icon:null},
              {label: 'Logout', href:'', icon:null},
            ]}
          />
    );
  }

  const renderNonLoggedInMenu = () => {
    return (
      <DropDownMenu 
            menu={
              <a className="loginButton" onClick={() => setLoginModal(true)}> Login </a>
            }
            menus={[
              {label: 'My Profile', href:'', icon:null},
              {label: 'Orders', href:'', icon:null},
              {label: 'Wishlist', href:'', icon:null}
            ]}
            firstMenu={
              <div className="firstmenu">
                <span>New Customer?</span>
                <a style={{ color: 'coral'}}>Sign Up</a>
              </div>
            }
          />
    );
  }

  return(
    <div className="header">
      <Modal 
        visible={loginModal}
        onClose={() => setLoginModal(false)}
      >
        <div className='authContainer'>
          <div className='row'>
            <div className='leftSpace'>
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlists and Recommendations</p>
            </div>
            <div className='rightspace' style={{ margin: '0 2rem', width: '50%'}}>
              <MaterialInput 
                type='text'
                label='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MaterialInput 
                type='password'
                label='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <MaterialButton 
                title="Login"
                bgColor="white"
                textColor="coral"
                style={{ margin: '2rem 0' }}
                onClick={userLogin}
              />
              <p style={{ margin: '1rem', textAlign: 'center'}}>OR</p>
              <MaterialButton 
                title="Request OTP"
                bgColor="white"
                textColor="coral"
                style={{ margin: '2rem 0' }}
              />
            </div>
          </div>
        </div>
      </Modal>


      <div className="subHeader">
        <div className="logo">
          <a href="" className="logoimage">InSight</a>
        </div>
        <div style={{
          padding:'0 1rem'
        }}>
          <div className="searchInputContainer">
            <input 
              className="searchInput"
              placeholder={'Search for books'}
            />
            <div className="searchIconContainer">
              <IoIosSearch style={{
                color:'coral'
              }} />
            </div>
          </div>
        </div>

        <div className="rightMenu">
          {
            auth.authenticate ? 
              renderLoggedInMenu() : renderNonLoggedInMenu()
          }

          <DropDownMenu 
            menu={
              <a className="more">
                <span>More <IoIosArrowDown/></span>
              </a>
            }
            menus={[
              {label: '24/7 Customer Care', href:'', icon:null},
              {label: 'Advertise', href:'', icon:null},
              {label: 'Download App', href:'', icon:null}
            ]}
          />
          <div>
            <a className="cart">
              <IoIosCart/>
              <span style={{margin:'0 10px'}}>Cart</span>
            </a>
          </div>
        </div>
      </div>
    </div>
   )

 }

export default Header