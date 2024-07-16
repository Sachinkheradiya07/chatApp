const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authmiddleware");
const { sendMessage, allMessages } = require("../controllers/messageControl");

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

module.exports = router;
