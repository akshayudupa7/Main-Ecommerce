import ConnectToDb from "@/database";
import AuthUser from "@/middleware";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Joi from "joi";
import Cart from "@/models/cart";



export async function GET(req:Request){
    await ConnectToDb()
    const isAuthUser=await AuthUser(req)
    console.log(isAuthUser,'qqq')
    try{
        if(isAuthUser){
             const {searchParams}=new URL(req.url)
             const id=searchParams.get('id')
            console.log(id,"h")
             if(!id){
                return NextResponse.json({
                    success: false,
                    message: "id does not exist",
                  });
             }
        const cartValue=await Cart.find({userID:id}).populate('productID')
          console.log(cartValue,'pp')
             if(cartValue){
                return NextResponse.json({
                    success: true,
                    message:cartValue,
                  });
             }
             else{
                return NextResponse.json({
                    success: false,
                    message: "could not fetch succesfully",
                  });
             }
        }else{
            return NextResponse.json({
                success: false,
                message: "You are not authorized",
              });
        }

    }catch(error){
        console.log(error,'Zz')
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
          });
    }
}