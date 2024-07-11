import React from "react";
export default function UserProfile({params}:any){
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="text-4xl">profile id &nbsp;<span className="bg-orange-500 text-black rounded-xl p-2">{params.id}</span> </div>
        </div>
    );
}