import ConnectToDb from "@/database";
import AuthUser from "@/middleware";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Joi from "joi";
import Cart from "@/models/cart";



export async function DELETE(req:Request){
    await ConnectToDb()
    console.log(req)
    const isAuthUser=await AuthUser(req)
    try{
        if(isAuthUser){

             const {searchParams}=new URL(req.url)
             const id=searchParams.get('id')
               console.log(id,'ee')
             if(!id){
                return NextResponse.json({
                    success: false,
                    message: "id does not exist",
                  });
             }

            
            const cartValue=await Cart.findByIdAndDelete(id)
     
             if(cartValue){
                return NextResponse.json({
                    success: true,
                    message: "cart product deleted successfully",
                  });
             }
             else{
                return NextResponse.json({
                    success: false,
                    message: "sorry could not delete",
                  });
             }
        }else{
            return NextResponse.json({
                success: false,
                message: "You are not authorized",
              });
        }

    }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
          });
    }
}