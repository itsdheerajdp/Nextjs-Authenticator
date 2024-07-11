import { DBConnect } from "@/DBConection/DBConnection";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
DBConnect();
export async function POST(request:NextRequest){
    try {
        const req =await request.json();
        const {token,password} = req;
        console.log("token:",token);
        console.log("Token got:",token);
        const user = await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}});            
        console.log("User:",user);
        const newPassword = await bcryptjs.hash(password,10);
        if(user){
            user.password = newPassword;
            await user.save();
            return NextResponse.json({message:"Password Updated Successfully!!",status:200});
        }
        else{
            return NextResponse.json({error:"Invalid Token"},{status:404});        }
    }
    catch (error:any) {
        return NextResponse.json({error:error.message},{status:404});
    }
}