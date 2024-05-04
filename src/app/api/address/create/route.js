import connectDB from "@/backend/config/db";
import Address from "@/backend/models/address";
import { NextResponse } from "next/server";

connectDB();
export async function POST(req, _res) {
  const addressData = await req.json();
  try {
    const address = new Address(addressData);
    await address.save();
    return NextResponse.json({ success: true, address }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
