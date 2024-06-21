import React, { useContext, useState } from 'react';
import axios from 'axios';
import logo from '../../../assets/logo2.png';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { validateLoginForm } from '../../../Utilis/helper.js';
import { AuthContext } from '../../../Context/UserContext.jsx';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors,setErrors]=useState({})
  const navigate = useNavigate();
  const {login} =useContext(AuthContext)

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateLoginForm(email, password);
    setErrors(errors)

    if (Object.keys(errors).length > 0) {
      return;
    }
        const success=await login(email,password)
      if (success) {
        Swal.fire({
          title: 'Success!',
          text: "User login successfully",
          icon: 'success',
          timer: 5000,
          position: 'top-center',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/');
          }
        });
      } else {
          setEmail("") 
          setPassword("")     
      }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center ">
      <div className="d-flex">
        <div className="banner p-4 d-flex flex-column align-items-center justify-content-center">
          <img src={logo} alt="Logo" width="300" className="mb-3" />
        </div>
        <div className="form p-4 bg-white d-flex flex-column align-items-center justify-content-center">
            <div className='link'>
            <Link to="/recruiter-login" id="forgot" className="text-muted ">
            Are you a recruiter?
            </Link>
            </div>
        
          <h2 className="mb-3">Employee Login</h2>
          <img
            src="https://i.pinimg.com/236x/4d/a8/bb/4da8bb993057c69a85b9b6f2775c9df2.jpg"
            alt="profile"
            width="70"
            className="mb-3 rounded-circle shadow"
          />
          <form onSubmit={handleSubmit} className="w-100">
            <small className="mb-3 d-flex justify-content-center align-items-center">
              Need an Account? <Link to="/employee-signup">Sign Up</Link>
            </small>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
              placeholder="Email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
             {errors.email && <div className="invalid-feedback mb-2">{errors.email}</div>}
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             {errors.password && <div className="invalid-feedback mb-2">{errors.password}</div>}
            <button type="submit" className="btn btn-primary mb-3 w-100">
              Sign In
            </button>
          </form>
          <Link to="/employee-forgotPassword" id="forgot" className="text-muted">
            Forgot Your Password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
