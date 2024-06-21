import express from 'express'
import userController from '../../../Interface/Controller/UserController/userControl.js'
import authMiddleware from '../../../Interface/Middleware/authMiddleware.js'
const router= express.Router()

router.post('/employee-signup',userController.postSignup)
router.post('/employee-verifyOtp',userController.postVerifyOtp)
router.post('/employee-resentOtp',userController.postResendOtp)
router.post('/employee-login',userController.postLogin)
router.post('/employee-forgotPassword',userController.postForgotPassword)
router.post('/employee-resetPassword/:token',userController.postResetPassword)
router.get('/verify',authMiddleware,userController.isVerified)
router.get('/employee-details/:email',userController.getUser)
router.put('/employee-updateContact/:email',userController.userUpdate)
router.get('/employee-logout',authMiddleware,userController.postLogout)



export {router as UserRouter}