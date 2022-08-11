import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import loginBackground from './loginBackground.png'
import qrCode from './qrcode.PNG'
import './LoginForm.css'
import DemoUserLogin from '../auth/DemoUser';
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let errors = [];
    if (!email.includes("@") ) errors.push("Invalid email format, must includes @")
    setErrors(errors);
  }, [email]);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };


  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (sessionUser) return (
    <Redirect to="/" />
  );


  return (
    <div className="login-container" style={{
      backgroundImage:`url(${loginBackground})`,
      backgroundSize:'cover',
      }}>
          <div className='login-form-container'>
            <div className='login-inner-div'>
              <div>
              <form onSubmit={onLogin}>
              {/* {hasSubmitted && errors &&
                <div id='error-msg'>
                  {errors.map((error, ind) => (
                    <div key={ind} style={{textAlign:'center', color:"rgb(230, 65, 65)"}}> ❌ {error}</div>
                  ))}
                </div>
                } */}
                <div style={{textAlign:'center'}}>
                  <h1>Welcome back!</h1>
                  <p>We're so excited to see you again!</p>
                  <br></br>
                </div>
                  <div>
                    {errors.map((error, ind) => (
                      <div key={ind}><span style={{color:"red"}}>*</span> {error}</div>
                    ))}
                  </div>
                  <div>
                    <label htmlFor='email'>EMAIL</label>
                    <br></br>
                    <input
                      className='login-input'
                      name='email'
                      type='text'
                      placeholder='Email'
                      value={email}
                      onChange={updateEmail}
                    />
                    <br></br>
                    <label htmlFor='password'>PASSWORD</label>
                    <br></br>
                    <input
                      className='login-input'
                      name='password'
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={updatePassword}
                    />
                  </div>
                  <p>Please do not use real information here :)</p>
                  <br></br>
                  <div>
                    <button className="login-btn" type='submit'>Login</button>
                  </div>
                </form>
                <div className='login-demo-btn'>
                  <DemoUserLogin />
                </div>
                <div className='login-to-signup'>
                  <p>Need an Account? <NavLink to="/signup"> Register</NavLink></p>
                </div>
              </div>
                <div className='login-form-img'>
                  <img src={qrCode}></img>
                  <h2>Scan to Checkout <br></br>GitHub</h2>
                </div>
            </div>
          </div>

    </div>
  );
};

export default LoginForm;
