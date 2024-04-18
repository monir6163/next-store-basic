import connectDB from "@/backend/config/db";
import Product from "@/backend/models/product";
import { NextResponse } from "next/server";
connectDB();
export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Please provide product id" },
        { status: 400 }
      );
    }
    const products = await Product.findById(id).sort({
      createdAt: -1,
    });
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
