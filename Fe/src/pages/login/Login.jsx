import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';



import './login.css';
import { useKidsPreSchoolSlice } from 'src/redux/slice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { actions } = useKidsPreSchoolSlice();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('https://led-mn.vercel.app/api/auth/login', {
        email: email,
        password: password
      })
      .then((response) => {
        const { token, user } = response.data;
        Cookies.set('user', JSON.stringify(user));
        Cookies.set('token', token);
        dispatch(actions.setIsUser(true));
        setSuccess('Login successful.');
        setTimeout(() => {
          setSuccess(''); // Clear success message after 5 seconds
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        setError('Invalid email or password.'); // Set error message
        console.error(error);
      });
  };
  useEffect(() => {
    // Xóa thông báo đăng nhập thất bại khi người dùng nhập lại thông tin
    setError('');
  }, [email, password]);
  

  return (
    <div className="container-login100 snipcss-iEisH">
      
      <div className="wrap-login100">
        <div className="login100-form-title style-fgjJw" id="style-fgjJw">
          <span className="login100-form-title-1">Sign In</span>
        </div>
        <form className="login100-form validate-form">
          {/* Username input */}
          <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
            <span className="label-input100">Username</span>
            <input
              className="input100"
              type="text"
              name="username"
              placeholder="Enter username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="focus-input100"></span>
          </div>
          {/* Password input */}
          <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
            <span className="label-input100">Password</span>
            <input
              className="input100"
              type="password"
              name="pass"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="focus-input100"></span>
          </div>
          {/* Error message */}
          {error && <div className=" info error-message">{error}</div>}
            {/* Success message */}
            {success && <div className="info success-message">{success}</div>}
          <div className="flex-sb-m w-full p-b-30">
            <div className="contact100-form-checkbox">
              <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
              <label className="label-checkbox100" htmlFor="ckb1">
                Remember me
              </label>
            </div>
            <div>
              <a href="#" className="txt1">
                Forgot Password?
              </a>
            </div>
          </div>
          <div className="container-login100-form-btn">
            <button className="login100-form-btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;