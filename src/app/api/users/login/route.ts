import { DBConnect } from "@/DBConection/DBConnection";
import User from "@/models/user.models";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

DBConnect();
export async function POST(request:NextRequest){
    try {
        const reqBody =await request.json();
        const {username,password} = reqBody;
        // check if user doesn't exist 
        const userGot =await User.findOne({username:username});
        console.log("User got while login:",userGot);
        if(!userGot){
            return NextResponse.json({error:"User does not exist with given username"},{status:404});
        }
        // check if password is incorrect 
        const isValidPassword = await bcryptjs.compare(password,userGot.password);
        if(!isValidPassword){
            return NextResponse.json({error:"Password is incorrect!!"},{status:404});
        }
        // creating token
        const DataRequiredForToken = {
            id:userGot._id,
            email:userGot.email,
            username:userGot.username
        }
        const token = jwt.sign(DataRequiredForToken,process.env.TOKEN_SECRET_KEY!,{expiresIn:"1d"});
        console.log("Token got:",token);
        const response = NextResponse.json({message:"Login Successfully !!",status:200,userGot});
        response.cookies.set("Token",token,{httpOnly:true});
        return response;
    } catch (error:any) {
        return NextResponse.json({error:"error.message"},{status:404})
    }
}