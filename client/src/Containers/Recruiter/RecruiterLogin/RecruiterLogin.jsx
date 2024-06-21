import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../../assets/logo2.png'
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { validateLoginForm } from '../../../Utilis/helper.js';
import './RecruiterLogin.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors,setErrors]=useState({})
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateLoginForm(email, password);
    setErrors(errors)

    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/recruiter-login', { email, password});
      if (response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: response.data.message,
          icon: 'success',
          timer: 5000,
          position: 'top-center',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/');
          }
        });
      } else {
        console.log(response.data.message);
        Swal.fire({
            title: 'Error!',
            text: response.data.message,
            icon: 'error',
            timer: 5000,
            position: 'top-center',
          });  
          setEmail("") 
          setPassword("")     
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.error(error.response.data);
        Swal.fire({
            title: 'Error!',
            text: error.response.data.message,
            icon: 'error',
            timer: 5000,
            position: 'top-center',
          });
          setEmail("") 
          setPassword("")     
      } else {
        console.error('An error occurred:', error);
        Swal.fire({
            title: 'Error!',
            text:"An error occured.Please try again later",
            icon: 'error',
            timer: 5000,
            position: 'top-center',
          });
    }
    }
  };

  return (
    <div className="recruiterlogin-container d-flex align-items-center justify-content-center ">
      <div className="d-flex">
        <div className="banner p-4 d-flex flex-column align-items-center justify-content-center">
          <img src={logo} alt="Logo" width="300" className="mb-3" />
        </div>
        <div className="form p-4 bg-white d-flex flex-column align-items-center justify-content-center">
            <div className='link'>
            <Link to="/employee-login" id="forgot" className="text-muted ">
            Are you an employee?
            </Link>
            </div>
        
          <h2 className="mb-3">Recruiter Login</h2>
          <img
            src="https://i.pinimg.com/236x/4d/a8/bb/4da8bb993057c69a85b9b6f2775c9df2.jpg"
            alt="profile"
            width="70"
            className="mb-3 rounded-circle shadow"
          />
          <form onSubmit={handleSubmit} className="w-100">
            <small className="mb-3 d-flex justify-content-center align-items-center">
              Need an Account? <Link to="/recruiter-signup">Sign Up</Link>
            </small>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
              placeholder="Email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
             {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             {errors.password && <div className="invalid-feedback ">{errors.password}</div>}
            <button type="submit" className="btn btn-primary mb-3 w-100">
              Sign In
            </button>
          </form>
          <Link to="/recruiter-forgotPassword" id="forgot" className="text-muted">
            Forgot Your Password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
