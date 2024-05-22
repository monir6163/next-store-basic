import User from "@/backend/models/user";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req, res) {
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
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({
        status: false,
        message: "user not found",
        hint: "user not found",
      });
    }

    return NextResponse.json(
      {
        status: true,
        message: "user deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        status: false,
      },
      { status: 500 }
    );
  }
}
