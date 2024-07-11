import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import { sendEmail } from "@/helpers/mailer";
export async function POST(request:NextRequest){
try {
    const requestBody =await request.json();
    const {email} = requestBody;
    const user =await User.findOne({email:email});
    if(!user){
        return NextResponse.json({error:"User Doesn't Exist with given email!!"},{status:404})
    }
    const userId = user._id;
    await sendEmail({email:email,type:"RESET",userId:userId});
    return NextResponse.json({message:"Password Updated Successfully!!",status:200,data:user})
} catch (error) {
  return NextResponse.json({error:"Error Occured During Reseting the password!!"},{status:404})
}
}