import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";


connect();

export async function GET(request:NextRequest){
try {
   const userId = await getDataFromToken(request);
   const user = await User.findById({_id:userId}).select("-password");
//    If i do not want isAdmin and isCreatedAt then i can use this :  select("-password -isAdmin -isCreatedAt")
return NextResponse.json({
    message:"User found",
    data: user
})
} catch (error:any) {
   return NextResponse.json({error:error.message},{status:500}); 
}
}