import Product from "@/backend/models/product";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req, _res) {
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
    const reviewData = await req.json();
    reviewData.user = id;

    const product = await Product.findById(reviewData.productId);
    if (!product) {
      return NextResponse.json(
        {
          status: false,
          error: "Product not found",
        },
        { status: 404 }
      );
    }
    const review = {
      user: reviewData.user,
      rating: Number(reviewData.rating),
      comment: reviewData.comment,
    };
    const alreadyReviewed = product.reviews.find(
      (r) => r.user === reviewData.user
    );

    if (alreadyReviewed) {
      product.reviews.forEach((review) => {
        if (review.user === alreadyReviewed.user) {
          review.rating = Number(reviewData.rating);
          review.comment = reviewData.comment;
        }
      });
    } else {
      product.reviews.push(review);
    }

    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    return NextResponse.json(
      {
        status: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
