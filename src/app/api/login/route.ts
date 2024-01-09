import ConnectToDb from "@/database";
import User from "@/models/user";
import { compare } from "bcryptjs";
import Joi from "joi";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
export async function POST(req: Request) {
  await ConnectToDb();

  const { email, password } = await req.json();

  const { error } = schema.validate({ email, password });
  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
      error,
    });
  }
  try {
    const checkuser = await User.findOne({ email });
    if (!checkuser) {
      return NextResponse.json({
        success: false,
        message: "user does not exist",
      });
    }

    const checkpassword = await compare(password, checkuser.password);

    if (!checkpassword) {
      return NextResponse.json({
        success: false,
        message: "password is not matching",
      });
    }

    const token = jwt.sign(
      {
        id: checkuser._id,
        email: checkuser.email,
        password: checkuser.password,
        role: checkuser.role,
      },
      "default_secret_key",
      { expiresIn: "1d" }
    );

    const finalData = {
      token,
      user: {
        email: checkuser.email,
        password: checkuser.password,
        role: checkuser.role,
        id: checkuser._id,
      },
    };
    return NextResponse.json({
      success: true,
      message: "Login successfull!",
      finalData,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}
