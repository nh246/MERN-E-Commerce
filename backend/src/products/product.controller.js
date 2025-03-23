const Reviews = require("../reviews/review.model");
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
    const min = parseFloat(minPrice)
    const max = parseFloat(maxPrice)
    if(!isNaN(min)&& !isNaN(max)){
      filter.price = {$gte:min, $lte:max}
    }
  }

  const skip = (parseInt(page)-1) * parseInt(limit)
  const totalProducts = await Products.countDocuments(filter)
  const totalPages = Math.ceil(totalProducts / parseInt(limit))


  const products = await Products.find(filter)
    .skip(skip)
    .limit(parseInt(limit))
    .populate("author", 'email username')
    .sort({createdAt: -1})



  return successResponse(res, 200, "All products fetched successfully", data={
    products,
    totalProducts,
    totalPages})
} catch (error) {
  return errorResponse(res, 500, " Failed to get all products", error)
}
}

// get single product

const getSingleProduct = async (req, res)=> {

  const {id}= req.params

  try {
  const product = await Products.findById(id).populate("author", "email username")

  if(!product){
    return errorResponse(res, 404, "Product not found")
  }
  const reviews = await Reviews.find({productId: id}).populate("userId", "email username")

  return successResponse(res,200, "Single product and reviews", {product, reviews})

    
  } catch (error) {
    return errorResponse(res, 500, "Failed to get single product", error)
  }
}


// update ProductById

const updateProductById = async (req,res)=> {
  
  const productId = req.params.id
  try {
    const updatedProduct = await Products.findByIdAndUpdate(productId, {...req.body}, {new:true})

    if(!updatedProduct){
      return errorResponse(res, 404, "Product not found")

    }

    return successResponse(res, 200, "Product updated successfully", updatedProduct)
  } catch (error) {
    return errorResponse(res, 500, "Failed to update product", error)
  } 

}

// delete Product By Id

const deleteProductById = async (req,res)=> {
  
   const productId = req.params.id

   try {
    const deletedProduct = await Products.findByIdAndDelete(productId)

    if(!deletedProduct){
      return errorResponse(res, 404, "Product not found")
    }
    await Reviews.deleteMany({productId: productId})
    return successResponse(res, 200, "Product deleted successfully")
    
   } catch (error) {
    return errorResponse(res, 500, "Failed to delete Product", error)
   }
}


module.exports = { createNewProduct , getAllProducts, getSingleProduct, updateProductById , deleteProductById};
