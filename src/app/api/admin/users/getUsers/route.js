import User from "@/backend/models/user";
import { authOptions } from "@/lib/authOptions";
import APIFilters from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req, _res) {
  try {
    const resPerPage = 2;
    const authSession = await getServerSession(authOptions);
    if (!authSession && authSession?.user?.role !== "admin") {
      return NextResponse.json(
        {
          error: "Unauthorized",
          hints: "user route",
          traceId:
            Math.random().toString(36).substring(2) + "user-route-unauthorized",
        },
        { status: 401 }
      );
    }
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams);
    const usersCount = await User.countDocuments();

    const apiFilters = new APIFilters(User.find(), query).pagination(
      resPerPage
    );
    const users = await apiFilters.query;

    return NextResponse.json(
      {
        success: true,
        users,
        usersCount,
        resPerPage,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        hints: " user route error",
        traceId: Math.random().toString(36).substring(2) + "user-route-error",
      },
      { status: 500 }
    );
  }
}
