import ConnectToDb from "@/database";
import AuthUser from "@/middleware";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Joi from "joi";
import Product from "@/models/product";
import Cart from "@/models/cart";


const cartSchema = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),

  });

export async function POST(req:Request){
    await ConnectToDb()
    const isAuthUser=await AuthUser(req)
    try{
        if(isAuthUser){

            const data=await req.json()
            const {userID,productID}=data
             const {error}=cartSchema.validate(userID,productID)
          

             console.log(userID,productID,'xxx')
             const currentcartExist=await Cart.find({userID,productID})
              console.log(currentcartExist,'bvc')
             if(currentcartExist.length>0){
                return NextResponse.json({
                    success: false,
                    message: "product already exist in acrt",
                  });
                  
             }
             const saveCart=await Cart.create(data)

             if(saveCart){
                return NextResponse.json({
                    success: true,
                    message: "product added to cart",
                  });
             }
             else{
                return NextResponse.json({
                    success: false,
                    message: "product could not add to cart",
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