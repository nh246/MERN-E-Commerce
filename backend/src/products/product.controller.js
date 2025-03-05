const Reviews = require("../reviews/review.model");
const { errorResponse, successResponse } = require("../utilis/responseHandler");
const Products = require("./product.model");


// creating a new product
const createNewProduct = async (req, res) => {
  try {
    const newProduct = new Products({ ...req.body });
    const savedProduct = await newProduct.save();

    // calculate average rating
    const reviews = await Reviews.find({ productId: savedProduct._id });

    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);

      const averageRating = totalRating / reviews.length;
      savedProduct.rating = averageRating
      await savedProduct.save();
    }

    return successResponse(
      res,
      200,
      "Product created successfully",
      savedProduct
    );
  } catch (error) {
    return errorResponse(res, 500, "Failed to create a new product", error);
  }
};

module.exports = { createNewProduct };
