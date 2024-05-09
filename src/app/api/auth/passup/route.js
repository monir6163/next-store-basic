import connectDB from "@/backend/config/db";
import User from "@/backend/models/user";
import { authOptions } from "@/lib/authOptions";
import bycrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

connectDB();
export async function PUT(req, _res) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { status: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const { oldPass, newPass } = await req.json();
    if (!oldPass || !newPass) {
      return NextResponse.json(
        { status: false, error: "All fields are required" },
        { status: 400 }
      );
    }
    const user = await User.findById(session.user._id).select("+password");
    console.log(user);
    if (!user) {
      return NextResponse.json(
        { status: false, error: "User not found" },
        { status: 404 }
      );
    }
    const isMatch = await bycrypt.compare(oldPass, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { status: false, error: "Invalid password" },
        { status: 400 }
      );
    }
    user.password = newPass;
    await user.save();

    return NextResponse.json(
      { status: true, message: "Password updated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        error: error.message,
        hints: "update pass error",
        traceId: Math.random().toString(36).substring(2) + "update-pass-error",
      },
      { status: 500 }
    );
  }
}
