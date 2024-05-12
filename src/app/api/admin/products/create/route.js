import connectDB from "@/backend/config/db";
import Product from "@/backend/models/product";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req, _res) {
  connectDB();
  try {
    //check admin role only can create product
    let authRole = await getServerSession(authOptions);
    if (!authRole || authRole?.user?.role !== "admin") {
      return NextResponse.json(
        {
          status: false,
          message: "You are not authorized to perform this action",
          hints: "admin role required",
          trace_id: "trace_1234" + Math.random().toString(36).substr(2, 9),
        },
        { status: 403 }
      );
    }

    const productData = await req.json();
    productData.user = authRole.user._id;

    const newProduct = new Product(productData);

    await newProduct.save();

    return NextResponse.json(
      {
        status: true,
        message: "new product created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: error.message,
        hints: "new product creation failed",
        trace_id: "trace_1234" + Math.random().toString(36).substr(2, 9),
      },
      { status: 500 }
    );
  }
}
