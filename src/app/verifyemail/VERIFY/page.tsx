"use client"
import axios from "axios";
import React, { useState } from "react"
import { useRouter } from "next/navigation";
export default function VerifyEmailPage(){
    const router = useRouter();
    const [token, setToken] = useState('') ;
    const handleClick = async() => {
        // Call API to verify email
        console.log("Button clicked");
        const url = window.location.href;
        setToken(url.split('token=')[1]);
        const response = await axios.post('/api/users/verifyemail', {token:token});
        if(response.status===200){
            alert("Email Verified Successfully");
            router.push('/profile');
        }
        console.log("Response from verify email",response);
        // console.log("Token is for email:",token);
       
    }
    return (
            
            
                <div className="min-h-screen m-5 flex flex-col justify-center items-center">
                <h1>Verify Email</h1>
                <p className="m-4">Please <button onClick={handleClick} className="bg-orange-500 p-2 rounded-xl">Click Here</button> to verify your email </p>
                </div>
            
        
    );
}