const { selectComments } = require('../models/comments')

exports.getComments = (req, res, next) => {
    const id = req.params.review_id;
    return selectComments(id)
        .then((data) => {
            console.log('controller', data)
            res.status(200).send({ comments: data })
        })
        .catch((err) => {
            next(err);
    })
}