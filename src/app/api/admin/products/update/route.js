import connectDB from "@/backend/config/db";
import Product from "@/backend/models/product";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req, _res) {
  connectDB();
  try {
    const auth = await getServerSession(authOptions);
    if (!auth || auth.user.role !== "admin") {
      return NextResponse.json({
        error: "Unauthorized",
        hints: "user not authenticated",
        trace_id: "unauthorized-user" + Math.random() * 1000,
      });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const newData = await req.json();

    const product = await Product.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!product) {
      return NextResponse.json({
        status: "error",
        message: "Product not found",
        hint: "product not found",
      });
    }

    return NextResponse.json({
      status: true,
      message: "product updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      hints: "product update issue",
      trace_id: "error-product-update" + Math.random() * 1000,
    });
  }
}
