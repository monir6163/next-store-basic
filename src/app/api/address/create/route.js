import connectDB from "@/backend/config/db";
import Address from "@/backend/models/address";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

connectDB();
export async function POST(req, _res) {
  const addressData = await req.json();
  const userId = await getToken({ req });
  addressData.user = userId?._doc?._id;
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
