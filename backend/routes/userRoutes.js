const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authmiddleware");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControl");

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);

module.exports = router;
