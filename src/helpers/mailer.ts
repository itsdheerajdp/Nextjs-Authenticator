import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/user.models";
export async function sendEmail({email,type,userId}:any){
    try {
        const hashedToken =await bcryptjs.hash(userId.toString(),10);
        console.log("Hashed Token:",hashedToken)
        if(type==="RESET"){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000})
        }
        else if(type === "VERIFY"){
            await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000})

        }   
        var transport = nodemailer.createTransport({
          service: 'gmail',
            host: "smtp.gmail.com",
            port:465,
            secure: true,
            auth: {
              user: process.env.GOOGLE_APP_USER,
              pass: process.env.GOOGLE_APP_PASSWORD
            }
          });
          const mailOptions = {
            from: process.env.GOOGLE_APP_USER,
            to: email,
            subject: type === "VERIFY" ? "Verify Your Account" : "Reset Your Password",
            html: `<p>click <a href="${process.env.domain}/verifyemail/${type}?token=${hashedToken}">here</a> to ${type === "VERIFY" ? "Verify your account!" : "Reset Your Password"} </p>`
          };

          const mailresponse = await transport.sendMail(mailOptions);
         return mailresponse;
    } catch (error:any) {
        throw new Error(error.message);
    }
}