import Jwt  from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const getUserId = (request:NextRequest)=>{
try {
    const token = request.cookies.get("Token")?.value || '';
    const DecodedToken:any = Jwt.verify(token,process.env.TOKEN_SECRET_KEY!);
    return DecodedToken.id; // this id is given in data required for token in login route
} catch (error) {
    return NextResponse.json({error:"Error Occured During Getting the value of User Id"},{status:404});
}

}