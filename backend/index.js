const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

require('dotenv').config()

async function main() {
  await mongoose.connect(process.env.UB_URL);
}

main().then(()=> console.log("Mongodb connected successfully")).catch((err) => console.log(err));

// reonflix433
// Oa1I5yje6sN1kzzj

app.get("/", (req, res) => {
  res.send("Lebaba Ecomarce server running ");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
