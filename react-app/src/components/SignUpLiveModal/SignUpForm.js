import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import loginBackground from '../LoginLiveModal/loginBackground.png'
import './SignupForm.css'
const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let errors = [];
    if (username.length < 3 || username.length > 50) errors.push("Name length should be between 3 and 50 characters")
    if (!email.includes("@") ) errors.push("Invalid email format")
    if (password.length < 6 ) errors.push("Password must be at least 6 characters")
    if (password !== repeatPassword) errors.push("Confirmed password doesnt match")
    setErrors(errors);

  }, [username, email, password]);

  const onSignUp = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setHasSubmitted(false)
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="signup-container" style={{
      backgroundImage:`url(${loginBackground})`,
      backgroundSize:'cover',
      }}>
      <div className='signup-form-container'>
        <form onSubmit={onSignUp}>
          <div style={{textAlign:'center'}}>
                  <h1>Create an account</h1>
                  <br></br>
          </div>
          {hasSubmitted && errors &&
            <div id='error-msg'>
              {errors.map((error, ind) => (
                <div key={ind} style={{textAlign:'center', color:"rgb(230, 65, 65)"}}> ❌ {error}</div>
              ))}
            </div>
            }
          <div>
            <label>USERNAME</label>
            <br></br>
            <input
              className='signup-input'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            />
          </div>

          <div>
            <label>EMAIL</label>
            <br></br>
            <input
              className='signup-input'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            />
          </div>
          <div>
            <label>PASSWORD</label>
            <br></br>
            <input
              className='signup-input'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            />
          </div>
          <div>
            <label>CONFIRMED PASSWORD</label>
            <br></br>
            <input
              className='signup-input'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
            />
          </div>
          <p>Please do not use real information here :)</p>
          <br></br>
          <button className="signup-btn" type='submit'>Sign Up</button>
        </form>
        <div className='login-to-signup'>
          <NavLink to="/login"> Already have an account? </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
