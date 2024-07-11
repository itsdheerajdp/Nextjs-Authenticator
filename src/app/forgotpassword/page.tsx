"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function forgotPasswordPage() {
    const [email, setEmail] = useState("");
    const route = useRouter();
    const forgotPasswordHandler = async () => {
        try {
            const response = await axios.post('/api/users/forgotpasswordmailer',{email:email});
            console.log("Response:",response);
            if(response.status === 200){
                alert("Password Reset Email Sent to you!!");
                route.push('/profile');
            }
        } catch (error:any) {
            alert(error.response.data.error)
            console.log("Error While Resetting Password:", error);
        }
    };
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className='text-3xl mb-10'>
                <h1>Forgot Password Page</h1>
            </div>
            <div>
                <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="m-4 p-2 rounded-xl text-black"
                />
            </div>
            <div>
                <button
                    type="button"
                    className="text-white bg-blue-600 p-2 rounded-xl"
                    onClick={forgotPasswordHandler}
                >
                    Reset Password
                </button>
            </div>
        </div>
   
    );
}