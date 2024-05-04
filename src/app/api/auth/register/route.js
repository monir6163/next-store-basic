import connectDB from "@/backend/config/db";
import User from "@/backend/models/user";
import { NextResponse } from "next/server";

connectDB();
export async function POST(req, _res) {
  const userData = await req.json();
  try {
    const user = new User(userData);
    await user.save();
    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
