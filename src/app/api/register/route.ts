import mongoose from "mongoose";
import Joi from "joi";
import ConnectToDb from "@/database";
import { NextResponse } from "next/server";
import User from "@/models";
import { hash } from "bcryptjs";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

export async function POST(req: Request) {
  await ConnectToDb();

  const { name, email, password, role } = await req.json();
  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return NextResponse.json({
        success: false,
        message: "user already exist",
      });
    }

    const hashpassword = await hash(password, 12);

    const newlyCreatedUser = await User.create({
      name,
      email,
      password: hashpassword,
      role,
    });
    if (newlyCreatedUser) {
      return NextResponse.json({
        success: true,
        message: "Account created successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}
