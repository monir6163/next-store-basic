import connectDB from "@/backend/config/db";
import Product from "@/backend/models/product";
import UploadCloudinary from "@/lib/UploadCloudinary";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req, _res) {
  connectDB();
  try {
    const authSession = await getServerSession(authOptions);
    if (!authSession || authSession?.user?.role !== "admin") {
      return NextResponse.json({
        status: "error",
        message: "Unauthorized",
        hint: "user not authenticated",
      });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const formData = await req.formData();
    const images = formData.getAll("image");

    //upload images to cloudinary and get the public_id and url
    const imagePromises = images?.map(async (image) => {
      return await UploadCloudinary(image, "ecom/products");
    });

    const imageResults = await Promise.all(imagePromises);

    await Product.findByIdAndUpdate(id, {
      images: imageResults,
    });

    return NextResponse.json(
      {
        status: true,
        message: "images uploaded successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
        hints: "image upload failed to update product images",
        trace_id: "error-image-upload" + Math.random() * 1000,
      },
      { status: 500 }
    );
  }
}
