import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userUseCase from '../../Application/Usecase/userUsecase.js'
dotenv.config()

const authMiddleware=async(req,res,next)=>{
    try {
        const token=req.cookies.accessToken
        if(!token){
            return res.status(400).json({message:"Access denied. No token found"})
        }
        const decoded=jwt.verify(token,process.env.KEY)
        const user=await userUseCase.getUserByEmail(decoded.email)
        if(!user){
            return res.status(401).json({message:"User not found"})
        }
        req.user=user
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Invalid token' });
    }
}
export default authMiddleware