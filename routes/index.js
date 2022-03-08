const express = require("express")
const router = express.Router()
const index = require("./modules/index")
const restaurants = require("./modules/restaurants")

router.use("/", index)
router.use("/restaurants", restaurants)

module.exports = router