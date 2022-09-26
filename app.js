const express = require('express')

const { getCategories } = require("./controllers/categories");
const { getReview } = require("./controllers/review")
const { getUsers } = require("./controllers/users")
const { getComments } = require("./controllers/comments")
const { postComment } = require("./controllers/comments")


const app = express()

app.use(express.json());

app.get('/api/categories', getCategories);

app.get('/api/reviews/:review_id', getReview)

app.get('/api/users', getUsers);

app.get('/api/reviews/:review_id/comments', getComments)

app.post('/api/reviews/:review_id/comment', postComment)

app.use((err, req, res, next) => {
  if (err.status) {
      console.log("error", err)
      res.status(err.status).send({ message: err.message })
    }
  else next(err);
})


app.use((err, req, res, next) => {
    console.log("500 error", err);
    res.status(500).send({ message: "server error" });
  });

module.exports = app