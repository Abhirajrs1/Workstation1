import express from 'express'
import recruiterController from '../../../Interface/Controller/RecruiterController/recruiterControl.js'
import jobController from '../../../Interface/Controller/RecruiterController/jobController.js'
import Middleware from '../../../Interface/Middleware/authMiddleware.js'
const authMiddleware=Middleware.recruiterMiddleware

const router=express.Router()



router.post('/recruiter-signup',recruiterController.postRecruiterSignup)
router.post('/recruiter-verifyOtp',recruiterController.postVerifyOtp)
router.post('/recruiter-resentOtp',recruiterController.postResendOtp)
router.post('/recruiter-login',recruiterController.postLogin)
router.post('/recruiter-forgotPassword',recruiterController.postForgotPassword)
router.post('/recruiter-resetPassword/:token',recruiterController.postResetPassword)
router.get('/recruiter-verify',authMiddleware,recruiterController.recruiterVerified)
router.get('/recruiter-logout',authMiddleware,recruiterController.postLogout)

router.post('/recruiter-postJob',authMiddleware,jobController.postJob)
router.get('/recruiter-getJobs',authMiddleware,jobController.getAllJobs)


export {router as RecruiterRouter}
