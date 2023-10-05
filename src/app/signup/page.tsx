"use client";
import React,{useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
export default function SignupPage(){
    const router=useRouter();
    const [user,setUser]=useState({
        email:"",
        username:"",
        password:""
    });
    const [buttonDisabled,setButtonDisabled]=useState(false);
    const [loading,setLoading]=useState(false);

    const onSignUp=async()=>{
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup',user);
            console.log("Signup success",response.data);
            router.push('/login')
        } catch (error:any) {
            console.log("Signup failed",error.message);
            toast.error(error.message);
        }finally{
            setLoading(false)
        }
    }
useEffect(()=>{
    if(user.username.length>0 && user.email.length>0 && user.password.length>0){
        setButtonDisabled(false)
    }else{
        setButtonDisabled(true)
    }
},[user])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
           <h1>{loading ? "Processing" : "Signup"}</h1>
           <hr/>
           <label htmlFor="username">Username</label>
           <input className='p-2 border border-gray300 rounded-lg text-black mb-4 focus:outline-none focus:border-gray-600' type="text" id="username" value={user.username} onChange={(e)=> setUser({...user,username:e.target.value})} placeholder='Enter your username'/>
           <label htmlFor="email">Email</label>
           <input className='p-2 border border-gray300 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-600' type="email" id="email" value={user.email} onChange={(e)=> setUser({...user,email:e.target.value})} placeholder='Enter your email'/>
           <label htmlFor="password">Password</label>
           <input className='p-2 border text-black border-gray300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' type="password" id="password" value={user.password} onChange={(e)=> setUser({...user,password:e.target.value})} placeholder='Enter your password'/>
            <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none foucus:border-gray-600' onClick={onSignUp}>{buttonDisabled ? "No Signup" : "Signup"}</button>   
            <Link href='/login'>Visit Login Page</Link>    
        </div>
    )
}