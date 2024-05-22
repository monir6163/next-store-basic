import Order from "@/backend/models/order";
import { NextResponse } from "next/server";

export async function DELETE(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return NextResponse.json({
        status: false,
        message: "Order not found",
        hint: "Order not found",
      });
    }

    return NextResponse.json({
      status: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: false,
    });
  }
}
