import ConnectToDb from "@/database";
import Product from "@/models/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    await ConnectToDb()
  
   try{
    const {searchParams}=new URL(req.url)
    const id=searchParams.get('id')
    console.log(id)
    const getProduct=await Product.find({category:id})
    console.log(getProduct)
    if(getProduct){
        return NextResponse.json({
            success: true,
            message:getProduct,
          });
    }else{
        return NextResponse.json({
            success: false,
            message: "could not filter product",
          });

    }

   }catch(error){
    console.log(error)
    return NextResponse.json({
        success: false,
        message: "something went wrong",
      });
   }
  
}