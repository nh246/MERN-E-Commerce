const { generateToken } = require("../middleware/generateToken");
const User = require("./user.model");

// UserRegistration
const userRegistration = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log(req.body)

    const user = new User({ username, email, password });
    // console.log(user)
    await user.save();
    res.status(200).send({ message: "Registration successful" });
  } catch (error) {
    console.error("Error registering a user:", error);
    res.status(500).send({ message: "Registration failed" });
  }
};

//   user LoggedIn

const userLoggedIn = async (req, res) => {
  //   console.log(req.body)

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password)
   if(!isMatch){
    return res.status(401).send({ message: "invalid password" });}
    const token = await generateToken(user._id);
    res.cookie('token', token, { httpOnly: true , secure: true, sameSite: "None" });
    res.status(200).send({
         message: "Login successful",
         token,
         user: {
           _id: user._id,
           username: user.username,
           email: user.email,
           role: user.role,
           profileImage: user.profileImage,
           bio: user.bio,
           profession: user.profession
         },
        });



  } catch (error) {
    console.error("Error logging in a user:", error);
    res.status(500).send({ message: "Login failed" });
  }
};

// user Logout 

const userLogout = async (req, res)=> {
 try {
  res.clearCookie("token");
  res.status(200).send({message: "Logged out successfully"})
  
 } catch (error) {
  console.error("Error logged out a user:", error);
  res.status(500).send({ message: "Logged out failed" });
 }
}


module.exports = { userRegistration, userLoggedIn, userLogout };
