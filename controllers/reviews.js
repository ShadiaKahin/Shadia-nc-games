const { selectReviews } = require('../models/reviews')

exports.getReviews = (req, res, next) => {
    const category = req.params.category;
    return selectReviews(category)
        .then((data) => {
            console.log('in controller', data)
            res.status(200).send({ reviews: data })
        })
        .catch((err) => {
            next(err);
    })
}
