"use client"
import axios from "axios";
import React, { useState } from "react"
import { useRouter } from "next/navigation";
export default function VerifyEmailPage(){
    const router = useRouter();
    const [token, setToken] = useState('') ;
    const [password,setpassword]=useState('');
    const handleClick = async() => {
        // Call API to verify email
       try {
        console.log("Button clicked");
        const url =window.location.href;
        setToken(url.split('token=')[1]);
        console.log("Token Got:",token);
        if(password === '')alert("Enter The New Password!");
        console.log("Password:",password);
        const response = await axios.post('/api/users/forgotpassword', {token:token,password:password});
        if(response.status===200){
            alert("Password Updated Successfully");
            router.push('/profile');
        }
        console.log("Response from verify email",response);
        console.log("Token is for email:",token);
       
       } catch (error) {
        alert("Internal Server Error")
        console.log("Error:",error)
       }
    }
    return (
            
            
                <div className="min-h-screen m-5 flex flex-col justify-center items-center">
                 <input type="text" className="rounded-xl m-4 p-4 text-black" value={password} onChange={(event)=>setpassword(event.target.value)} placeholder="Enter New Password"/>
                 <button onClick={handleClick} className="bg-orange-500 p-2 rounded-xl">Update Your Password</button> 
                </div>
            
        
    );
}