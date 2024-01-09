import ConnectToDb from "@/database"
import mongoose from "mongoose"
import { NextResponse } from "next/server";
import Product from "@/models/product";
import AuthUser from "@/middleware";
export async function DELETE(req:Request){
    await ConnectToDb()
    const isAuthUser=await AuthUser(req)
    try{
         
        const {searchParams}=new URL(req.url)
        const id=searchParams.get('id');
       
        if(!id){
            return NextResponse.json({
                success: false,
                message: "Product Id not found",
              });

        }
        if (typeof isAuthUser === 'object' && isAuthUser !== null && 'role' in isAuthUser && isAuthUser.role === 'admin'){
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
            message: "something went wrong",
          });
    }
}