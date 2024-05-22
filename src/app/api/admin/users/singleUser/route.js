import connectDB from "@/backend/config/db";
import User from "@/backend/models/user";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req, _res) {
  connectDB();
  try {
    const authSession = await getServerSession(authOptions);
    if (!authSession && authSession?.user?.role !== "admin") {
      return NextResponse.json(
        {
          status: false,
          error: "unauthorized",
          hints: "user-details-failed",
          trace_id: "user-details",
        },
        { status: 401 }
      );
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const user = await User.findById(id);
    return NextResponse.json(
      {
        status: true,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        error: error.message,
        hints: "user-details-failed",
        trace_id: "user-details",
      },
      { status: 500 }
    );
  }
}
