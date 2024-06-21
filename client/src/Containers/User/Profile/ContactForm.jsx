import React, { useContext, useEffect,useState } from 'react';
import './ContactForm.css'
import Navigation from '../../../Components/Navigation';
import { AuthContext } from '../../../Context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ContactForm = () => {

  const {user,setUser,isAuthenticated,loading}=useContext(AuthContext)
  const navigate=useNavigate()

  const [formData,setFormData]=useState({
      username:'',
      contact:'',
      useraddress:[{
        Housename:'',
        area:'',
        street:'',
        pincode:'',
        city:'',
        state:'',
        country:'India'
      }]
  })
  useEffect(()=>{
    if(!isAuthenticated && !loading){
      navigate('/employee-login')
    }else if(user){
      setFormData({
        username:user.username||'',
        contact:user.contact ||'',
        useraddress:user.useraddress.length > 0 ? user.useraddress[0] :
        {
          Housename: '',
          area: '',
          street:'',
          pincode:'',
          city:'',
          state:'',
          country:''||"India"   
        }
      })
    }
  },[user,isAuthenticated,navigate])

  const handleChange=(e)=>{
    const {id,value}=e.target
    if(id==='username' || id==='contact'){
      setFormData({
        ...formData,[id]:value
      })
    }else{
      setFormData({
        ...formData,
        useraddress:{
          ...formData.useraddress,
          [id]:value,
        }
      })
    }
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const updatedUserContact={
        ...user,
        username:formData.username,
        contact:formData.contact,
        useraddress:[formData.useraddress]
      }
      const response=await axios.put(`http://localhost:3000/employee-updateContact/${user.email}`,{updatedUserContact},{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        Swal.fire({
          title: 'Success!',
          text: response.data.message,
          icon: 'success',
          timer: 5000,
          position: 'top-center'
        });
        setUser(response.data.user)
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }else{
          console.log(response.data);
          Swal.fire({
              title: 'Error!',
              text: response.data.message,
              icon: 'error',
              timer: 5000,
              position: 'top-center',
            })
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
        } else {
        console.error("An error occurred:", error);
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred. Please try again later.',
            icon: 'error',
            timer: 5000,
            position: 'top-center',
          });
        }
    }
  }
  return (
    <>
    <Navigation/>
    <div className="contact-container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
            <i
              className="fas fa-arrow-left fa-lg mb-3"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/employee-profile')}
            ></i>
              <h5 className="card-title text-center">Contact Information</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    Name 
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label">
                    Phone
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">+91</span>
                    <input
                      type="text"
                      className="form-control"
                      id="contact"
                      value={formData.contact}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <p className="form-text">This helps match you with nearby jobs.</p>
                  <div className="mb-2">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      value={formData.useraddress.country}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="Housename" className="form-label">
                      Housename
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Housename"
                      value={formData.useraddress.Housename}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="area" className="form-label">
                      Area
                    </label>
                    <input type="text" className="form-control" id="area" value={formData.useraddress.area} onChange={handleChange}/>
                  </div>
                  <div className="mb-2">
                    <label htmlFor="streetAddress" className="form-label">
                      Street
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="street"
                      value={formData.useraddress.street}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="cityState" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      value={formData.useraddress.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      value={formData.useraddress.state}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="mb-2">
                    <label htmlFor="pincode" className="form-label">
                      Pincode
                    </label>
                    <input type="text" className="form-control" id="pincode" value={formData.useraddress.pincode} onChange={handleChange}/>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactForm;