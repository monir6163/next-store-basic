import connectDB from "@/backend/config/db";
import Order from "@/backend/models/order";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req, _res) {
  connectDB();
  try {
    const authSession = await getServerSession(authOptions);
    if (!authSession && authSession?.user?.role !== "admin") {
      return NextResponse.json({
        status: false,
        error: "unauthorized",
        hints: "order-details-failed",
        trace_id: "123-order-details",
      });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const order = await Order.findById(id)
      .populate("shippingInfo user")
      .sort("-createdAt");
    return NextResponse.json({
      status: true,
      order,
    });
  } catch (error) {
    return NextResponse.json({
      status: false,
      error: error.message,
      hints: "order-details-failed",
      trace_id: "123-order-details",
    });
  }
}
