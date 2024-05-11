import Order from "@/backend/models/order";
import { authOptions } from "@/lib/authOptions";
import APIFilters from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req, _res) {
  try {
    const resPerPage = 2;
    const authSession = await getServerSession(authOptions);
    if (!authSession) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          hints: "my order route",
          traceId:
            Math.random().toString(36).substring(2) +
            "myorder-route-unauthorized",
        },
        { status: 401 }
      );
    }
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams);
    const ordersCount = await Order.countDocuments({
      user: authSession.user._id,
    });

    const apiFilters = new APIFilters(Order.find(), query).pagination(
      resPerPage
    );
    const orders = await apiFilters.query
      .find({ user: authSession.user._id })
      .populate("shippingInfo user")
      .sort("-createdAt");

    return NextResponse.json(
      {
        success: true,
        orders,
        ordersCount,
        resPerPage,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        hints: "my order route error",
        traceId:
          Math.random().toString(36).substring(2) + "myorder-route-error",
      },
      { status: 500 }
    );
  }
}
