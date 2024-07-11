import User from "@/models/user.models";
import {getUserId} from "@/helpers/getUserId";
import { NextRequest, NextResponse } from "next/server";
import { DBConnect } from "@/DBConection/DBConnection";
DBConnect();
export async function GET(request:NextRequest){
try {
    const id=await getUserId(request);
    console.log("Current User Id:",id);
    const currentUser = await User.findOne({_id:id}).select("-password");
    return NextResponse.json({Messagee:"User Found!!",data:currentUser});
} catch (error) {
    return NextResponse.json({error:"Current User Can't Find"},{status:404});
}
}