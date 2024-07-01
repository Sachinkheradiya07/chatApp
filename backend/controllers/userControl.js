const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

//Get or Search all users

const allUsers = wrapAsync(async (req, res) => {
  const { search } = req.query;
  console.log("Search Query:", search);

  let keyword = {};

  if (search) {
    const regex = new RegExp(search, "i");
    keyword = {
      $or: [{ name: { $regex: regex } }, { email: { $regex: regex } }],
    };
  }

  console.log("Search Keyword:", keyword);

  const users = await User.find(keyword);
  console.log("Found Users:", users);
  res.send(users);
});

// Register new user

const registerUser = wrapAsync(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

// Authenticate the user

const authUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = { allUsers, registerUser, authUser };
