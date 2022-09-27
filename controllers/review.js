const { selectReview, selectReviews } = require('../models/review')

exports.getReview = (req, res, next) => {
    const id = req.params.review_id;
    return selectReview(id)
        .then((data) => {
            res.status(200).send({ review: data })
        })
        .catch((err) => {
            next(err);
    })
}


exports.getReviews = (req, res, next) => {
    return selectReviews()
    .then((data) => {
        res.status(200).send({ reviews: data })
    })
    .catch((err) => {
        next(err);
})
}
