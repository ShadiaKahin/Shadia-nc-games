const express = require('express')

const { getCategories } = require("./controllers/categories");
const { getReview } = require("./controllers/review")

const app = express()

app.use(express.json());

app.get('/api/categories', getCategories);

app.get('/api/reviews/:review_id', getReview)

app.use((err, req, res, next) => {
    if (err.status === 404) {
      res.status(404).send({ message: 'not found' })
    }
    else next(err);
  })

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "general error catch" });
  });

module.exports = app