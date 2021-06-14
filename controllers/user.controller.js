const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ 
          success: false, 
          message: "Please signup! Given user details doesnt exist" });
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if(!validatePassword){
      return res.status(401).json({
        success: false,
        message: "Wrong credentials, Please check and try again.",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        expiry: "24h",
      },
      process.env.secret
    );
    res
      .status(201)
      .json({ 
        success: true, 
        token, 
        message:"Successfully LoggedIn" 
      });
  } catch (err) {
    res.json({
      success: false,
      message: "Login failed",
      errorMessage: err.message
    })
  }
};


const getUserInfo = async (req, res) => {
  try {
    const { userId } = req;
    const { firstname, lastname, email } = await User.findById(userId);
    res
      .status(200)
      .json({ success: true, user: { firstname, lastname, email } });
  } catch (err) {
     res.json({
      success: false,
      message: "Signup failed",
      errorMessage: err.message
    })
  }
}

const addANewUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(403)
        .json({ 
          success: false, 
          message: "You have already signed up!"
          });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ 
      firstname, 
      lastname, 
      email, 
      password: hashedPassword,
      wishlist: [],
      cart: [],
    });
   
    const savedUser = await user.save();
    res
      .status(201)
      .json({ 
        success: true,
        message: "Successfully signed up with Lingokart",
        user
        });
  } catch (err) {
      res.json({
        success: false,
        message: "Signup failed",
        errorMessage: err.message
      })
    }
};

module.exports = { getUserInfo, addANewUser, signInUser }
