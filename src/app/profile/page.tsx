"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; //Corrected import statement
import axios from "axios";

export default function ProfilePage() {
    const [currentUser, setCurrentUser] = useState({
        username: "",
        email: "",
        isVerified: false,
    });
    const [status, setStatus] = useState(false); // Corrected variable name 'setstatus' to 'setStatus'
    const route = useRouter();

    const logoutHandler = async () => {
        try {
            await axios.get("/api/users/logout");
            alert("User Logged Out Successfully!!");
            route.push("/login");
        } catch (error: any) {
            console.log("Error While Logout:", error);
        }
    };

    const getUserDetail = async () => {
        try {
            const userResponse = await axios.get('/api/users/currentUser');
            console.log("User:", userResponse.data.data);
            setCurrentUser(userResponse.data.data);
            setStatus(true); // Corrected function name 'setstatus' to 'setStatus'
        } catch (error) {
            console.log("Some Error Occurred During Fetching the Current User!!");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex justify-between">
                <div className="flex flex-col justify-center">
                    <div>
                        <h1>Profile Page</h1>
                    </div>
                </div>
                <div>
                    <button
                        type="button"
                        className="m-4 text-white bg-red-600 p-2 rounded-xl"
                        onClick={logoutHandler}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="flex">
                    {currentUser.isVerified ? (
                        <div className="m-4 text-white bg-green-400 p-3 rounded-xl">
                            <h1>Verification Status: Verified</h1>
                        </div>
                    ) : (
                        <div className="m-4 text-white bg-red-500 p-3 rounded-xl">
                            <h1>Get Your Account Verified Within an Hour</h1>
                        </div>
                    )}
                </div>
            </div>
            <button
                onClick={getUserDetail}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Get User Details
            </button>
            {status ? (
                <div className="m-4 flex flex-col w-full p-4 bg-blue-500 rounded-xl">
                    <h1>Username: {currentUser?.username}</h1>
                    <h1>Email: {currentUser?.email}</h1>
                </div>
            ) : (
                <div className="m-4 flex p-4 bg-blue-500 rounded-xl">No Data</div>
            )}
        </div>
    );
}
