const { selectReview } = require('../models/review')

exports.getReview = (req, res, next) => {
    const id = req.params.review_id;
    // const newId 
    return selectReview(id)
        .then((data) => {
            res.status(200).send({ review: data })
        })
        .catch((err) => {
            next(err);
    })
}
