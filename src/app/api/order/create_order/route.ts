import ConnectToDb from "@/database";
import AuthUser from "@/middleware";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Order from "@/models/order";
import Cart from "@/models/cart";
export async function POST(req:Request){

 
    await ConnectToDb()
    try{

        const isAuthUser=await AuthUser(req)
        if(isAuthUser){
            const data=await req.json()
            console.log(data,'jag')
            const {user}=data
            console.log(user)
            const saveNewOrder=await Order.create(data)
            console.log(saveNewOrder,'jagaur')
            if (saveNewOrder) {
                await Cart.deleteMany({ userID: user });
                return NextResponse.json({
                  success: true,
                  message: "Products are on the way !",
                });
              } else {
                return NextResponse.json({
                  success: false,
                  message: "Failed to create a order ! Please try again",
                });
              }
        }else{
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