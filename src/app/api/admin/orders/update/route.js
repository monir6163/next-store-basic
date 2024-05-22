import Order from "@/backend/models/order";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
  try {
    const auth = await getServerSession(authOptions);
    if (!auth && auth?.user?.role !== "admin") {
      return NextResponse.json({
        status: false,
        message: "unauthorized",
        hint: "login",
      });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const orderStatus = await req.json();
    const order = await Order.findByIdAndUpdate(id, orderStatus);
    if (!order) {
      return NextResponse.json({
        status: false,
        message: "Order not found",
        hint: "Order not found",
      });
    }

    return NextResponse.json({
      status: true,
      message: "Order updated successfully",
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
