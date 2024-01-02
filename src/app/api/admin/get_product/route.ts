import ConnectToDb from "@/database";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Product from "@/models/product";

export async function GET() {
  await ConnectToDb();

  try {
    const extractData = await Product.find({});
    if (!extractData) {
      return NextResponse.json({
        success: false,
        message: "Product not found",
      });
    } else {
      return NextResponse.json({
        success: true,
        message: extractData,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}
