import express from 'express'
import recruiterController from '../../../Interface/Controller/RecruiterController/recruiterControl.js'

const router=express.Router()



router.post('/recruiter-signup',recruiterController.postRecruiterSignup)
router.post('/recruiter-verifyOtp',recruiterController.postVerifyOtp)
router.post('/recruiter-resentOtp',recruiterController.postResendOtp)
router.post('/recruiter-login',recruiterController.postLogin)
router.post('/recruiter-forgotPassword',recruiterController.postForgotPassword)
router.post('/recruiter-resetPassword/:token',recruiterController.postResetPassword)


export {router as RecruiterRouter}
