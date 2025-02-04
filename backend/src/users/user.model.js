const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profileImage: String,
    bio: {type: String, maxLength:200},
    profession: String,
    role: {type: String,default: "user", required: true},
    createdAt: {type: Date, default: Date.now},
  });


  const User = model('User', userSchema);

module.exports =User;