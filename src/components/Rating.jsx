"use client";
import StarRatings from "react-star-ratings";
const Rating = ({ rating }) => {
  return (
    <StarRatings
      id="rating"
      rating={rating}
      starRatedColor="#ffb829"
      numberOfStars={5}
      starDimension="18px"
      starSpacing="1px"
      name="rating"
    />
  );
};

export default Rating;
