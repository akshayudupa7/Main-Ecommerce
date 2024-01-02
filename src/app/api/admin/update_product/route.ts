import ConnectToDb from "@/database";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Product from "@/models/product";

export async function PUT(req: Request) {
  await ConnectToDb();

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
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}
