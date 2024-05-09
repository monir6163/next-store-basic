import connectDB from "@/backend/config/db";
import Address from "@/backend/models/address";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

connectDB();
export async function GET(_req, _res) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Not authorized", hint: "Login first" },
        { status: 401 }
      );
    }
    const address = await Address.find();
    return NextResponse.json({ success: true, address }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        hints: "Check if the address model is correctly defined",
        trace: error.stack,
      },
      { status: 500 }
    );
  }
}
