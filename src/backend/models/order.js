import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Shipping required Order Table"],
      ref: "Address",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User required Order table"],
      ref: "User",
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, "Product required order table"],
          ref: "Product",
        },
        name: {
          type: String,
          required: [true, "Name is required"],
        },
        quantity: {
          type: String,
          required: [true, "qty is required"],
        },
        image: {
          type: String,
          required: [true, "Image Url is required"],
        },
        price: {
          type: String,
          required: [true, "Price is required"],
        },
      },
    ],
    paymentInfo: {
      id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      taxPaid: {
        type: Number,
        required: true,
      },
      amountPaid: {
        type: Number,
        required: true,
      },
    },
    orderStatus: {
      type: String,
      default: "processing",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
