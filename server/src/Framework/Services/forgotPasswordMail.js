import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const sendEmail=(token,email)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass:process.env.PASSWORD
        }
      });
      
      var mailOptions = {
        from: 'workstation@gmail.com',
        to: email,
        subject: 'Reset password',
        text: `http://localhost:5173/employee-resetPassword/${token}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return res.json({message:"Error occured"})
        } else {
            return res.json({status:true,message:"Email sent"})
        }
      });
}

  export default sendEmail