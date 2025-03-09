const Reviews = require("../reviews/review.model");
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const { errorResponse, successResponse } = require("../utilis/responseHandler");
const Products = require("./product.model");


// creating a new product (admin)

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


// get All Products

const getAllProducts = async (req,res) => {
try {

  const {category, color, minPrice, maxPrice, page=1, limit=10} = req.query
  const filter= {}

  if(category && category !== "all"){
    filter.category = category
  }

  if(color && color !== "all"){
    filter.color = color
  }

  if(minPrice && maxPrice){
    const min = perseFloat(minPrice)
    const max = parseFloat(maxPrice)
    if(!isNaN(min)&& !isNaN(max)){
      filter.price = {$gte:min, $lte:max}
    }
  }

  const products = await Products.find()
  return successResponse(res, 200, "All products fetched successfully", products)
} catch (error) {
  return errorResponse(res, 500, " Failed to get all products", error)
}
}

module.exports = { createNewProduct , getAllProducts};
