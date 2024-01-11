import ConnectToDb from "@/database";
import mongoose from "mongoose";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import Product from "@/models/product";
export async function GET(req: any) {
  await ConnectToDb();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const product = await Product.find({
      $or: [{ name: { $regex: id, $options: "i" } }],
    });

    return NextResponse.json({
      success: true,
      message: product,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "user already exist",
    });
  }
}
