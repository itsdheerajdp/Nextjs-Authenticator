"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const route = useRouter();
  const [loading,setloading] = useState(false)
  const [user,setuser] = useState({
    username:"",
    password:""
  })
  const onLogin = async()=>{
       try {
        setloading(true);
        const response = await axios.post("/api/users/login",user);
        console.log("Login Response:",response);
        alert(response.data.message);
        route.push("/profile");
       } catch (error:any) {
        if(!error.response){
          console.log("Error During Login:",error);
          alert("Error Occured During Login")
      
      }
      else{
          console.log("Error while Login:",error.response.data.error)
          alert(error.response.data.error);
      }
       }
       setloading(false);
  }
  return (
    <div className="flex flex-col justify-center items-center bg-black text-white p-5 border-2 rounded-xl m-40">
    <h1>{loading?"Processing...":"Login Page"}</h1>
    <br />
    <label htmlFor="username">Username</label> <input id="username" className="p-2 border-2 rounded-xl text-black" type="text" onChange={(event)=>setuser({...user,username:event.target.value})} />
    <label htmlFor="password">password</label> <input id="password" className="p-2 border-2 rounded-xl text-black" type="password" onChange={(event)=>setuser({...user,password:event.target.value})} />
     <button className="w-full m-2 rounded-2xl border-2 p-2 border-slate-100" onClick={onLogin}>Login</button>
     <button className="w-full m-2 rounded-2xl border-2 p-2 border-slate-100"> <a href="/forgotpassword">Forgot Password?</a> </button>
    <Link href="/signup">Go to SignUp Page</Link>
</div>
  )
}
