const express = require('express')

const { getCategories } = require("./controllers/categories");
const { getReview } = require("./controllers/review")
const { getUsers } = require("./controllers/users")
const { patchReview } = require("./controllers/patch-review")

const app = express()

app.use(express.json());

app.get('/api/categories', getCategories);

app.get('/api/reviews/:review_id', getReview)

app.get('/api/users', getUsers);

app.patch('/api/reviews/:review_id', patchReview)

app.use((err, req, res, next) => {
    if (err.code) {
        res.status(400).send({ message: "bad request" })
    }
    else if (err.status) {
      res.status(err.status).send({ message: err.message })
    }
    else next(err);
})

app.use((err, req, res, next) => {
    res.status(500).send({ message: "server error" });
  });

module.exports = app