"use client";
import { AuthContext } from "@/context/authContext";
import { ProductContext } from "@/context/productContext";
import { getUserReview } from "@/lib/Helper";
import { useContext, useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

const NewReview = ({ product }) => {
  // console.log(product);
  const { user } = useContext(AuthContext);
  const { reviewProduct, loading } = useContext(ProductContext);
  const [data, setData] = useState({
    rating: 0,
    comment: "",
    productId: product._id,
  });
  useEffect(() => {
    if (!user) return;
    const userReview = getUserReview(product.reviews, user._id);
    if (userReview) {
      setData({
        rating: userReview.rating,
        comment: userReview.comment,
        productId: product._id,
      });
    }
  }, [user, product]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reviewProduct(data);
  };

  return (
    <div>
      <hr className="my-4" />
      <h1 className="text-gray-500 review-title my-5 text-2xl">Your Review</h1>

      <h3>Rating</h3>
      <div className="mb-4 mt-3">
        <div className="ratings">
          <StarRatings
            rating={data.rating}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name="rating"
            starHoverColor="#ffb829"
            starDimension="25px"
            changeRating={(newRating) =>
              setData({ ...data, rating: newRating })
            }
          />
        </div>
      </div>
      <div className="mb-4 mt-5">
        <label className="block mb-1"> Comments </label>
        <textarea
          rows="4"
          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-1/3"
          placeholder="Your review"
          name="comment"
          required
          value={data.comment}
          onChange={handleChange}
        ></textarea>
      </div>

      <button
        className="mt-3 mb-5 px-4 py-2 text-center inline-block text-white bg-yellow-500 border border-transparent rounded-md hover:bg-yellow-600 w-1/3"
        onClick={handleSubmit}
      >
        {loading ? "Loading..." : "Submit Review"}
      </button>
    </div>
  );
};

export default NewReview;
