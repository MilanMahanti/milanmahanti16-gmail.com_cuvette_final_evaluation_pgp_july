const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const re = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name can not be empty."],
    validate: {
      validator: function (val) {
        return validator.isAlpha(val, "en-US", { ignore: " " });
      },
      message: "Name should only have characters.",
    },
  },
  email: {
    type: String,
    required: [true, "User must have an email."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password can not be empty."],
    validate: {
      validator: function (val) {
        return re.test(val);
      },
      message:
        "Use a strong password with special characters and numbers and atleast 8 characters long.",
    },
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password."],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Please confirm your password.",
    },
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.checkPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
