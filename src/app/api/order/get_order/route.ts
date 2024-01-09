import ConnectToDb from "@/database";
import AuthUser from "@/middleware";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Order from "@/models/order";


export async function GET(req:Request){
    try{
    await ConnectToDb()
    const isAuthUser=await AuthUser(req)

    if(isAuthUser){
        const {searchParams}=new URL(req.url)
        const id=searchParams.get('id')
        
        const extractAllproducts=await Order.find({user:id}).populate('orderItems.product')

        if(extractAllproducts){
            return NextResponse.json({
                success:true,
                message:extractAllproducts
            })
        }else{
            return NextResponse.json({
                success:false,
                message:"could not fetch product succesfully"
            })
        }
    }
    else{
        return NextResponse.json({
            success:false,
            message:"you are not authenticated"
        })
    }
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"something went wrong"
        })
    }
}