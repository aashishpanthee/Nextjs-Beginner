"use client";
import React,{useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function LoginPage(){
    const router=useRouter();
    const [user,setUser]=useState({
        email:"",
        password:""
    });
    const [buttonDisabled, setButtonDisabled]=useState(false);
    const [loading,setLoading]=useState(false);

    const onLogin=async()=>{
        try {
            setLoading(true);
           const response = await axios.post("/api/users/login",user);
           console.log("Login Success",response.data)
           toast.success("Login success")
           router.push('/profile')
        } catch (error:any) {
            console.log("Login failed",error.message);
            toast.error(error.message);
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
           <h1>{loading ? "Processing" : "Login"}</h1>
           <hr/>
           <label htmlFor="email">Email</label>
           <input className='p-2 border border-gray300 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-600' type="text" id="email" value={user.email} onChange={(e)=> setUser({...user,email:e.target.value})} placeholder='Enter your email'/>
           <label htmlFor="password">Password</label>
           <input className='p-2 border border-gray300 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-600' type="password" id="password" value={user.password} onChange={(e)=> setUser({...user,password:e.target.value})} placeholder='Enter your password'/>
            <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none foucus:border-gray-600' onClick={onLogin}>{buttonDisabled ? "No  Login" : "Login"}</button>   
            <Link href='/signup'>Visit Signup Page</Link>    
        </div>
    )
}