const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser())

require("dotenv").config();

// routes

const userRoutes = require("./src/users/user.route");
const productsRoutes = require('./src/products/product.route')
const reviewsRoutes = require('./src/reviews/review.route')


app.use("/api/auth", userRoutes);
app.use('/api/products', productsRoutes)
app.use('/api/reviews', reviewsRoutes)

async function main() {
  await mongoose.connect(process.env.UB_URL);
  app.get("/", (req, res) => {
    res.send("Lebaba Ecomarce server running ");
  });
}

main()
  .then(() => console.log("Mongodb connected successfully"))
  .catch((err) => console.log(err));

// reonflix433
// Oa1I5yje6sN1kzzj

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
