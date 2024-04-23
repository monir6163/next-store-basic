import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please select product category"],
    enum: {
      values: ["Electronics", "Laptops", "Toys", "Office", "Beauty"],
      message: "Please select correct category for product",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    default: 0,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  __v: {
    type: Number,
    select: false,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
