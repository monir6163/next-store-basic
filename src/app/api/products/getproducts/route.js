import connectDB from "@/backend/config/db";
import Product from "@/backend/models/product";
import APIFilters from "@/lib/utils";
import { NextResponse } from "next/server";
connectDB();
export async function GET(req, res) {
  try {
    let resPerPage = 2;
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams);
    const productsCount = await Product.countDocuments();

    const apiFilters = new APIFilters(Product.find(), query).search().filter();

    let products = await apiFilters.query;
    const filteredProductsCount = products.length;

    apiFilters.pagination(resPerPage);

    products = await apiFilters.query.clone();

    return NextResponse.json({
      filteredProductsCount,
      productsCount,
      resPerPage,
      products,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
