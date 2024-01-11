import ConnectToDb from "@/database";
import Product from "@/models/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(req:Request){
   
    await ConnectToDb()

    try{

        const {page,perPage}=await req.json()
        console.log(page,perPage)
      const items=await Product.find({}).skip(perPage * (page - 1)).limit(perPage)
      const itemCount=await Product.countDocuments()
      console.log(itemCount)

      const response = { items, itemCount };
      return NextResponse.json({
        success:true,
        message:response
    })
      
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"something went wrong"
        })
    }
}