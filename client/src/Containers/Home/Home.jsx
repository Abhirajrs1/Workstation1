import React from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Footer from '../../Components/Footer'
import Navigation from '../../Components/Navigation.jsx'
import './Home.css'

function Home() {
  return (
    <div>
      <Navigation/>
        <div className="home-background">
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={8}>
            <h1 className="display-4 mb-3">3,000+ Browse Jobs</h1>
            <p className="lead mb-4">Find Jobs, Employment & Career Opportunities</p>
            <Form className="search-form">
              <Row>
                <Col md={3}>
                  <Form.Control type="text" placeholder="Keyword e.g. (Job Title, Description, Tags)" />
                </Col>
                <Col md={3}>
                  <Form.Control as="select">
                    <option>Select Location</option>
                    <option>Location 1</option>
                    <option>Location 2</option>
                  </Form.Control>
                </Col>
                <Col md={3}>
                  <Form.Control as="select">
                    <option>Experience</option>
                    <option>Fresher</option>
                    <option>1-2 Years</option>
                  </Form.Control>
                </Col>
                <Col md={3}>
                  <Button variant="info" type="submit" className="w-100">Search</Button>
                </Col>
              </Row>
            </Form>
            <p className="trending-keywords mt-3">Trending Keywords: ui designer, developer, senior, it company, design, call center</p>
          </Col>
        </Row>
    </div>
      <Footer/>
    </div>
  

  )
}

export default Home
