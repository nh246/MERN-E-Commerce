const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: String,
  bio: { type: String, maxLength: 200 },
  profession: String,
  role: { type: String, default: "user", required: true },
  createdAt: { type: Date, default: Date.now },
});

// hash password

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.markModified("password")) return next();

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  next();
});

const User = model("User", userSchema);

module.exports = User;
