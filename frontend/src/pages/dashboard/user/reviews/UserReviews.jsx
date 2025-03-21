import { useSelector } from "react-redux";
import { useGetReviewByUserIdQuery } from "../../../../redux/features/reviews/reviewsApi";
import Loading from "../../../../components/Loading";
import { useNavigate } from "react-router";

function UserReviews() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetReviewByUserIdQuery(user?._id);

  if (isLoading) return <Loading />;
  if (error) return <div>Failed to fetch User Reviews data</div>;

  const reviews = data?.data || {};
//   console.log(reviews);

  const handleCardClick = () => {
    navigate("/shop");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Given Reviews</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews &&
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 cursor-pointer hover:scale-105 transition-all duration-200"
            >
              <p className="text-lg font-semibold mb-2">
                Rating: {review.rating}
              </p>
              <p className="mb-2">
                <strong>Comment:</strong> {review.comment}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Product ID:</strong> {review.productId}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Created At:</strong>{" "}
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        <div
          className="bg-gray-100 text-black flex items-center justify-center rounded-lg p-6 border border-gray-200 cursor-pointer hover:bg-primary hover:text-white transition-all duration-200"
          onClick={handleCardClick}
        >
          <span className="text-3xl font-bold">+</span>
          <p className="ml-2 text-lg">Add New Review</p>
        </div>
      </div>
    </div>
  );
}

export default UserReviews;
