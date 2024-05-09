import connectDB from "@/backend/config/db";
import User from "@/backend/models/user";
import UploadCloudinary from "@/lib/UploadCloudinary";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

connectDB();
export async function PUT(req, _res) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { status: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const image = formData.get("image");
    const uploadImg = await UploadCloudinary(image, "ecom/user");
    if (uploadImg) {
      const userData = {
        name,
        email,
        avater: {
          public_id: uploadImg.public_id,
          url: uploadImg.url,
        },
      };

      const user = await User.findByIdAndUpdate(session?.user._id, userData, {
        new: true,
      });
      return NextResponse.json({ status: true, data: user });
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        error: error.message,
        hints: "update profile error",
        traceId:
          Math.random().toString(36).substring(2) + "_update_profile_error",
      },
      { status: 500 }
    );
  }
}
