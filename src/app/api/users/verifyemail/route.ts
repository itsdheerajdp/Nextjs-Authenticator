import { DBConnect } from "@/DBConection/DBConnection";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
DBConnect();
export async function POST(request:NextRequest){
    try {
        const req =await request.json();
        const {token} = req;
        console.log("token:",token);
        console.log("Token got:",token);
        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}});            
        console.log("User:",user);
        
        if(user){
            user.isVerified = true;
            user.verifyToken = undefined;
            user.verifyTokenExpiry = undefined;
            await user.save();
            return NextResponse.json({message:"Email Verified Successfully!!",status:200});
        }
        else{
            return NextResponse.json({error:"Invalid Token"},{status:404});        }
    }
    catch (error:any) {
        return NextResponse.json({error:error.message},{status:404});
    }
}