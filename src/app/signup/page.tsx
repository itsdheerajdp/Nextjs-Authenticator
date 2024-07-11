"use client";
import Link from "next/link";
import axios from "axios";
import React,{ useState } from "react";
import { useRouter } from "next/navigation"; 
export default function SignUpPage(){
    const router = useRouter();
    const [user,setuser] = useState({
        username:"",
        email:"",
        password:""
    })
    const [loading,setloading]=useState(false);
    const onSignUp = async()=>{
        try {
            setloading(true);
            const response = await axios.post("/api/users/signup",user);
            console.log("Response:",response);
            alert("Signup Successfull");
            router.push("/login");
        } catch (error:any) {
            if(!error.response){
                console.log("Error During Signup:",error);
                alert("Error Occured During Signup")
            
            }
            else{
                console.log("Error while Signing up:",error.response.data.error)
                alert(error.response.data.error);
            }
           
            
        }
        setuser({
            username:"",
            email:"",
            password:""
        });
        setloading(false);
        
    }
    return(
   
        <div className="flex flex-col justify-center items-center bg-black text-white p-5 border-2 rounded-xl m-40">
        <h1>{loading?"processing...":"Sign Up Page"}</h1>
        <br />
        <label htmlFor="username">Username</label> <input id="username" className="p-2 border-2 rounded-xl text-black" type="text" value={user.username} onChange={(event)=>setuser({...user,username:event.target.value})}/>
        <label htmlFor="email">Email</label> <input id="email" className="p-2 border-2 rounded-xl text-black" type="email" value={user.email} onChange={(event)=>setuser({...user,email:event.target.value})}/>
        <label htmlFor="password">password</label> <input id="password" className="p-2 border-2 rounded-xl text-black" type="password" value={user.password} onChange={(event)=>setuser({...user,password:event.target.value})} />
         <button className="w-full m-2 rounded-2xl border-2 p-2 border-slate-100" onClick={onSignUp}>SignUp</button>
        <Link href="/login">Go to Login Page</Link>
    </div>
   
        )
}