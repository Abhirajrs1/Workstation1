import React, { useContext, useState } from 'react'
import './Modal.css'
import { AuthContext } from '../../../Context/UserContext'

function Modal({show,onClose,type}) {
    const {user}=useContext(AuthContext)
    const [education,setEducation]=useState({
        level:'',
        field:'',
        startDate:'',
        endDate:''
    })
    const [skill,setSkill]=useState({
        userSkills:'',
        yearsOfExperience:''
    })
    const handleEducationChange=(e)=>{
        const{name,value}=e.target
        setEducation((prevState)=>({
            ...prevState,
            [name]:value
        }))
    }
    const handleSkillChange=(e)=>{
        const {name,value}=e.target
        setSkill((prevState)=>({
            ...prevState,
            [name]:value
        }))
    }


    if(!show){
        return null
    }
  return (
    <div className="modal-overlay">
        <div className='modal-container'>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{type === 'education' ? 'Add education' : 'Add skill'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form>
          {type === 'education' ? (
            <>
              <div className="form-group">
                <label htmlFor="educationLevel">Level of education*</label>
                <input type="text" id="educationLevel" name='level' value={education.level} onChange={handleEducationChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="fieldOfStudy">Field of study</label>
                <input type="text" id="fieldOfStudy" name='field' value={education.field} onChange={handleEducationChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="startDate">From</label>
                <input type="text" id="startDate" name='startDate' value={education.startDate} onChange={handleEducationChange} />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">To</label>
                <input type="text" id="endDate" name='endDate' value={education.endDate} onChange={handleEducationChange} />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="skill">Skill*</label>
                <input type="text" id="skill" name='userSkills' value={skill.userSkills} onChange={handleSkillChange}required />
              </div>
              <div className="form-group">
                <label htmlFor="yearsOfExperience">Years of experience</label>
                <input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={skill.yearsOfExperience}
                onChange={handleSkillChange}
                />
              </div>    
            </>
          )}
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="button">Save and add another</button>
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Modal
