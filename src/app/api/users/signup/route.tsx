import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();

        console.log(reqBody);

        const {username,email,password}=reqBody;
        const user = await User.findOne({email})
        // check if user already exists
        if(user){
            return NextResponse.json({error:'User already exists'},{status:400})
        }
        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new User({
            username,email,password:hashedPassword
        });

        const savedUser= await newUser.save();

        return NextResponse.json({message:"User created successfully",success:true,savedUser})

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}