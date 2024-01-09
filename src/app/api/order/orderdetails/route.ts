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
            const id=searchParams.get("id")
        if(!id){
            return NextResponse.json({
                success:false,
                message:"product ID is required"
            })
        }

        const extractOrderDetail=await Order.findById(id).populate('orderItems.product')
        if(extractOrderDetail){
            return NextResponse.json({
                success:true,
                message:extractOrderDetail
            })
        }else{
            return NextResponse.json({
                success:false,
                message:"failed to get order details"
            })
        }
        }else{
            return NextResponse.json({
                success:false,
                message:"you are not authorized"
            })
        }

    }catch(error){
        return NextResponse.json({
            success:false,
            message:"soomething went wrong"
        })
    }
}