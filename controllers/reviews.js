const { selectReviews } = require('../models/reviews')

exports.getReviews = (req, res, next) => {
    let review_id = req.query.review_id;
    let category = req.query.category;
    
    return selectReviews(review_id, category)
        .then((data) => {
            res.status(200).send({ reviews: data })
        })
        .catch((err) => {
            next(err);
    })
}



