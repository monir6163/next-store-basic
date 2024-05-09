import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req, _res) {
  try {
    const authSession = await getServerSession(authOptions);
    const { shippingInfo, cartItems } = await req.json();

    const line_items = cartItems?.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
            metadata: { productId: item.product },
          },
          unit_amount: item.price * 100,
        },
        tax_rates: ["txr_1PETvtEWcspB5PfyKMA8rX67"],
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.API_URL}/me/orders?order_success=true`,
      cancel_url: `${process.env.API_URL}`,
      customer_email: authSession.user.email,
      client_reference_id: authSession.user._id,
      mode: "payment",
      metadata: { shippingInfo },
      shipping_options: [
        {
          shipping_rate: "shr_1PEToEEWcspB5PfyYbiwwFIu",
        },
      ],
      line_items,
    });

    return NextResponse.json(
      {
        status: true,
        url: session.url,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        error: error.message,
        hints: "stripe route error",
        traceId: Math.random().toString(36).substring(7) + "stripe-route-error",
      },
      { status: 500 }
    );
  }
}
