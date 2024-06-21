import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaGraduationCap, FaCog, FaCertificate, FaIdCard, FaPlus } from 'react-icons/fa';
import Navigation from '../../../Components/Navigation';
import Modal from './Modal';
import'./Qualification.css'

const Qualifications = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navigation/>
    <div className="qualification-container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mb-3">Qualifications</h2>
          <p className="text-muted mb-4">
            We use these details to show you jobs that match your unique skills and experience.
          </p>

          {/* <div className="qualification-item d-flex align-items-center py-3 border-bottom">
            <FaBriefcase className="me-3" size={20} color="#6c757d" />
            <span className="flex-grow-1">Add most recent work experience</span>
            <FaPlus size={20} color="#0d6efd" onClick={() => navigate('/add-experience')} style={{cursor: 'pointer'}} />
          </div> */}

     <div className="qualification-item d-flex align-items-center py-3 border-bottom">
     <FaGraduationCap className="me-3" size={20} color="#6c757d" />
     <span className="flex-grow-1">Add education</span>
     <FaPlus size={20} color="#0d6efd" onClick={() => handleOpenModal('education')} style={{cursor: 'pointer'}} />
    </div>

     <div className="qualification-item d-flex align-items-center py-3 border-bottom">
    <FaCog className="me-3" size={20} color="#6c757d" />
    <span className="flex-grow-1">Add skill</span>
    <FaPlus size={20} color="#0d6efd" onClick={() => handleOpenModal('skill')} style={{cursor: 'pointer'}} />
    </div>

          {/* <div className="qualification-item d-flex align-items-center py-3 border-bottom">
            <FaIdCard className="me-3" size={20} color="#6c757d" />
            <span className="flex-grow-1">Add licences</span>
            <FaPlus size={20} color="#0d6efd" onClick={() => navigate('/add-licences')} style={{cursor: 'pointer'}} />
          </div> */}

          {/* <div className="qualification-item d-flex align-items-center py-3">
            <FaCertificate className="me-3" size={20} color="#6c757d" />
            <span className="flex-grow-1">Add certifications</span>
            <FaPlus size={20} color="#0d6efd" onClick={() => navigate('/add-certifications')} style={{cursor: 'pointer'}} />
          </div> */}
        </div>
      </div>
    </div>
    <Modal show={showModal} onClose={handleCloseModal} type={modalType} />
    </div>
  );
};

export default Qualifications;