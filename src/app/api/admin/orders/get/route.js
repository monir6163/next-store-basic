import Order from "@/backend/models/order";
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
          hints: "order route",
          traceId:
            Math.random().toString(36).substring(2) +
            "order-route-unauthorized",
        },
        { status: 401 }
      );
    }
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams);
    const ordersCount = await Order.countDocuments();

    const apiFilters = new APIFilters(Order.find(), query).pagination(
      resPerPage
    );
    const orders = await apiFilters.query
      .find()
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
        hints: " order route error",
        traceId: Math.random().toString(36).substring(2) + "order-route-error",
      },
      { status: 500 }
    );
  }
}
