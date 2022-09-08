const {updatedReview} = require('../models/patch-review')

exports.patchReview = (req, res, next) => {
const reviewId = req.params.review_id;
const newVote = req.body.inc_votes;
    updatedReview(reviewId, newVote).then((review) => {
    res.status(200).send({ review });
  })
    .catch((err) => {
      next(err);
  })
}
