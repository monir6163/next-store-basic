import Order from "@/backend/models/order";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function getCartItems(line_items) {
  return new Promise((resolve, reject) => {
    const cartItems = [];
    line_items?.data?.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;
      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });
      if (cartItems.length === line_items.data.length) {
        resolve(cartItems);
      }
    });
  });
}

export async function POST(req, _res) {
  try {
    const authSession = await getServerSession(authOptions);

    const rawBody = await req.text();
    const headersList = headers();
    const signature = headersList.get("stripe-signature");
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const line_items = await stripe.checkout.sessions.listLineItems(
        event.data.object.id
      );
      const orderItems = await getCartItems(line_items);
      const userId = session.client_reference_id;
      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
        amountPaid,
        taxPaid: session.total_details.amount_tax / 100,
      };

      const orderData = {
        user: userId,
        shippingInfo: session.metadata.shippingInfo,
        paymentInfo,
        orderItems,
      };

      // Save order to database
      const order = await Order.create(orderData);
      if (!order) {
        return NextResponse.json(
          {
            status: false,
            error: "Order not created",
            hints: "Error saving order to database",
            traceId:
              Math.random().toString(36).substring(7) + "order-not-created",
          },
          { status: 500 }
        );
      }
    }
    return NextResponse.json({
      status: true,
      message: "Order created successfully",
    });
  } catch (error) {
    console.log(error);
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
