const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstname: 
    {
       type: String, 
       required: "First name is required" 
    },
    lastname: 
    { 
      type: String, 
      required: "Last name is required" 
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function validateEmail (email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        },
        message: (props) => `${props.value} is required for a valid email!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (value) {
          return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/g.test(value);
        },
        message: () =>
          `Password should be a minimum of 6 char long with atleast 1 number`,
      },
    },
    wishlist: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Wishlist",
    },
    ],
    cart: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Cart",
    },
    ],
  },
  {timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };