import ConnectToDb from "@/database";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Product from "@/models/product";
import AuthUser from "@/middleware";


export async function PUT(req: Request) {
  await ConnectToDb();
  const isAuthUser=await AuthUser(req)
  try {
    const extractData = await req.json();
    const {
      name,
      description,
      price,
      imageUrl,
      category,
      deliveryInfo,
      onSale,
      priceDrop,
      _id,
    } = extractData;

    if (typeof isAuthUser === 'object' && isAuthUser !== null && 'role' in isAuthUser && isAuthUser.role === 'admin'){
        const updatedProduct = await Product.findOneAndUpdate(
            {
              _id:_id,
            },
            {
              name,
              description,
              price,
              imageUrl,
              category,
              deliveryInfo,
              onSale,
              priceDrop,
            },
            { new: true }
          );
          if (updatedProduct) {
            return NextResponse.json({
              success: true,
              message: "Product Updated Succesfully",
            });
          }else {
              return NextResponse.json({
                success: false,
                message: "Failed to update the product ! Please try again later",
              });
            }

    }else{
        return NextResponse.json({
            success: false,
            message: "You are not authorized",
          });

    }
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}
