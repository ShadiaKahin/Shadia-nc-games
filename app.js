const express = require('express')

const { getCategories } = require("./controllers/categories");
const { getReview } = require("./controllers/review")

const app = express()

app.use(express.json());

app.get('/api/categories', getCategories);

app.get('/api/reviews/:review_id', getReview)

app.use((err, req, res, next) => {
    if (err.status) {
      res.status(err.status).send({ message: err.message })
    }
    else next(err);
})


app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ message: "server error" });
  });

module.exports = app