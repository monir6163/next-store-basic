import connectDB from "@/backend/config/db";
import Product from "@/backend/models/product";
import cloudinary from "@/lib/Cloudinary";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req, _res) {
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
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({
        status: "error",
        message: "Product not found",
        hint: "product not found",
      });
    }

    for (let i = 0; i < product.images.length; i++) {
      const image = product.images[i];
      await cloudinary.v2.uploader.destroy(image.public_id);
    }

    await Product.deleteOne({ _id: id });

    return NextResponse.json({
      status: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      hints: "product delete issue",
      trace_id: "error-product-delete" + Math.random() * 1000,
    });
  }
}
