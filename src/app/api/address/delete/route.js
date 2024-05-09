import connectDB from "@/backend/config/db";
import Address from "@/backend/models/address";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

connectDB();

export async function DELETE(req, _res) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not authorized", hint: "Login first" },
        { status: 401 }
      );
    }
    const { searchParams } = new URL(req.url);

    const addressId = searchParams.get("id");
    const address = await Address.findByIdAndDelete(addressId);
    return NextResponse.json({ success: true, address }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        hints: "Check the address ID",
        traceId: Math.random().toString(36).substring(7) + "-PUT-ADDRESS-ERROR",
      },
      { status: 500 }
    );
  }
}
