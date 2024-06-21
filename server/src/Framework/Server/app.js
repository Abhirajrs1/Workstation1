import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { UserRouter } from '../Routes/UserRoutes/userRoutes.js'
import { RecruiterRouter } from '../Routes/RecruiterRoutes/recruiterRoutes.js'
import connectDB from '../Database/mongoClient.js'

dotenv.config()

const app=express()

const port=process.env.PORT ||3000

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
    methods:'GET,POST,PUT'
 }))

 app.use(cookieParser())

 app.use(express.json())
 app.use(express.urlencoded({ extended: true }));

 app.use('/',UserRouter)
 app.use('/',RecruiterRouter)

 connectDB().then(() => {
   app.listen(port, () => {
     console.log(`Server is running on http://localhost:${port}`);
   });
 }).catch(error => {
   console.error('Failed to connect to MongoDB', error);
 });