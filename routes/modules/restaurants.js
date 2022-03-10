const express = require("express")
const router = express.Router()
const Restaurant = require("../../models/Restaurant")

router.get("/new", (req, res) => {
  return res.render("new")
})

router.get("/:restaurantId", (req, res) => {
  const { restaurantId } = req.params
  return Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render("show", { restaurantData }))
    .catch(err => console.log(err))
})

router.post("/", (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

router.get("/:restaurantId/edit", (req, res) => {
  const { restaurantId } = req.params
  return Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render("edit", { restaurantData }))
    .catch(err => console.log(err))
})

router.put("/:restaurantId", (req, res) => {
  const { restaurantId } = req.params
  return Restaurant.findByIdAndUpdate(restaurantId, req.body)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(err => console.log(err))
})

router.delete("/:restaurantId", (req, res) => {
  const { restaurantId } = req.params
  return Restaurant.findByIdAndDelete(restaurantId)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

module.exports = router
