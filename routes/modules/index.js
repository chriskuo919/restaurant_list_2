const express = require("express")
const router = express.Router()
const Restaurant = require("../../models/Restaurant")

router.get("/", (req, res) => {
  Restaurant
    .find()
    .lean()
    .then(restaurantsData => res.render("index", { restaurantsData }))
    .catch(err => console.log(err))
})

router.get("/search", (req, res) => {
  if (!req.query.keywords) {
    res.redirect("/")
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  const sort = req.query.sort
  let sortingMethod = {}

  switch (sort) {
    case 'A->Z':
      sortingMethod = { name: 'asc' }
      break;
    case 'Z->A':
      sortingMethod = { name: 'desc' }
      break;
    case '類別':
      sortingMethod = { category: 'asc' }
      break;
    case '地區':
      sortingMethod = { location: 'asc' }
      break;
  }
  Restaurant
    .find()
    .lean()
    .sort(sortingMethod)
    .then(restaurantsData => {
      const filterRestaurantsData = restaurantsData.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render("index", {
        restaurantsData: filterRestaurantsData,
        keywords,
      })
    })
    .catch(err => console.log(err))
})

module.exports = router