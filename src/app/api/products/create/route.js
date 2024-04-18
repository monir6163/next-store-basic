import connectDB from "@/backend/config/db";
import Product from "@/backend/models/product";
import { NextResponse } from "next/server";

connectDB();
export async function POST(req, _res) {
  const productData = await req.json();
  try {
    const product = new Product(productData);
    await product.save();
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
