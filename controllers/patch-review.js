const { updatedReview } = require('../models/patch-review');

exports.patchReview = (req, res, next) => {
  console.log('patch review', req.body, req.params);

  const reviewId = req.params.review_id;
  const newVote = req.body.inc_votes;
  
  updatedReview(reviewId, newVote).then((review) => {
    console.log('response from model', review);
    res.status(200).send({ review });
  })
    .catch((err) => {
      next(err);
  })
}