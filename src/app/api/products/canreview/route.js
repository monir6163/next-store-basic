import Order from "@/backend/models/order";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const user = await getServerSession(authOptions);
    let id = user?.user?._id;
    if (!user) {
      return NextResponse.json(
        {
          status: false,
          error: "You need to be logged in to leave a review.",
        },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    const orders = await Order.find({
      user: id,
      "orderItems.product": productId,
    });

    let canReview = orders?.length >= 1 ? true : false;

    return NextResponse.json({ status: true, canReview }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: false, error: "Failed to check if user can review" },
      { status: 500 }
    );
  }
}
