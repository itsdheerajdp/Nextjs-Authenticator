import { DBConnect } from "@/DBConection/DBConnection";
import User from "@/models/user.models";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
DBConnect();
export async function POST(request:NextRequest){
try {
    const reqBody = await request.json();
    const {username,email,password} = reqBody;
    console.log("Request Body:",reqBody)
    if(username === "" || email==="" || password ==="" ){
        return NextResponse.json({error:"Details are not filled properly !!"},{status:404});
    }
    console.log("Requested User:",reqBody);
    // check if user exist 
    const userCheck = await User.findOne({email});
    if(userCheck){
        return NextResponse.json({error:"User already exist with given email"},{status:404});
    }
    const userCheckk =await User.findOne({username});
    if(userCheckk){
        return NextResponse.json({error:"User already exist with given username"},{status:404});
    }
    // password hashing
    const salt = await bcryptjs.genSalt(10);
    const hashedpassword = await bcryptjs.hash(password,salt);
    console.log("hashed password:",hashedpassword)
    const newUser = new User({
        username:username,
        email:email,
        password:hashedpassword
    })
    const savedUser =await newUser.save();
    console.log("Saved User:",savedUser);
    await sendEmail({email:email,type:"VERIFY",userId:savedUser._id});
    return NextResponse.json({message:"User Created Successfully !!",success:true,newUser})
} catch (error) {
    return NextResponse.json({error:"Error occured During Signup"},{status:404})
}
}