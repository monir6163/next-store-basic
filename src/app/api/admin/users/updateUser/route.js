import User from "@/backend/models/user";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
  try {
    const auth = await getServerSession(authOptions);
    if (!auth && auth?.user?.role !== "admin") {
      return NextResponse.json(
        {
          status: false,
          message: "unauthorized",
          hint: "login",
        },
        { status: 401 }
      );
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const userData = await req.json();
    const user = await User.findByIdAndUpdate(id, userData);
    if (!user) {
      return NextResponse.json({
        status: false,
        message: "user not found",
        hint: "user not found",
      });
    }

    return NextResponse.json({
      status: true,
      message: "user updated successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error.message,
        status: false,
      },
      { status: 5000 }
    );
  }
}
