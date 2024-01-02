import ConnectToDb from "@/database"
import mongoose from "mongoose"
import { NextResponse } from "next/server";
import Product from "@/models/product";
export async function DELETE(req:Request){
    await ConnectToDb()

    try{
         
        const {searchParams}=new URL(req.url)
        const id=searchParams.get('id');

        if(!id){
            return NextResponse.json({
                success: false,
                message: "Product Id not found",
              });

        }
        const  deletedProduct=await Product.findByIdAndDelete(id)
        if (deletedProduct) {
            return NextResponse.json({
              success: true,
              message: "Product deleted successfully",
            });
          } else {
            return NextResponse.json({
              success: false,
              message: "Failed to delete the product ! Please try again",
            });
          }

    }catch(error){
        return NextResponse.json({
            success: false,
            message: "something went wrong",
          });
    }
}