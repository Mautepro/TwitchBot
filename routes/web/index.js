const express = require('express');

const router = express.Router();

router.use("/", require("./home"));
router.use("/twitch", require("./twitch"));

module.exports = router;
