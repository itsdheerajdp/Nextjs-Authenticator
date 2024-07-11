import { NextResponse } from "next/server";
export async function GET(){
    try {
        const response = NextResponse.json({
            message:"User Logged Out Successfully",
            status:200,
            success:true
        })
        response.cookies.set("Token","",{httpOnly:true});
        return response;
    } catch (error) {
        console.log("I am in logout error");
        return NextResponse.json({error:"Error Occured During Logout !!"},{status:404});
    }
}