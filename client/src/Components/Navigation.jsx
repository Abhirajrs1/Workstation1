import React, { useContext } from 'react';
import { Navbar, Nav, Container,Dropdown } from 'react-bootstrap';
import { FaEnvelope, FaBell, FaUser } from 'react-icons/fa';
import logo from '../assets/logo2.png';
import { AuthContext } from '../Context/UserContext';

import './Navigation.css'; 
import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" bg="light" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            style={{ height: '80px', width: '150px' }} 
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto custom-font">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#company-reviews">Company reviews</Nav.Link>
            <Nav.Link href="#salary-guide">Salary guide</Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-center custom-font">
            {isAuthenticated ? (
              <>
                <Nav.Link href="#messages">
                  <FaEnvelope className="icon-btn" />
                </Nav.Link>
                <Nav.Link href="#notifications">
                  <FaBell className="icon-btn" />
                </Nav.Link>
                <Dropdown align="end">
                  <Dropdown.Toggle variant="light" id="dropdown-profile" className="icon-btn">
                    <FaUser />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Header style={{fontWeight:"bold",color:"black"}}>{user.email}</Dropdown.Header>
                    <Dropdown.Item as={Link} to={'/employee-profile'}>Profile</Dropdown.Item>
                    <Dropdown.Item href="#/jobs">My Jobs</Dropdown.Item>
                    <Dropdown.Item href="#/reviews">My Reviews</Dropdown.Item>
                    <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
                    <Dropdown.Item href="#/help">Help Centre</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Sign Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
              <Nav.Link 
                onClick={() => navigate('/employee-login')} 
                style={{ color: 'blue', fontWeight: 'bold' }}
              >
                Login
              </Nav.Link>
              <div className="navbar-divider"></div>
              <Nav.Link href="/recruiter-login" className="employer-link">
                Employers / Post Job
              </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
