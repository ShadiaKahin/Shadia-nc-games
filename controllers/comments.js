const { selectComments, insertComment } = require('../models/comments')

exports.getComments = (req, res, next) => {
    const id = req.params.review_id;
    return selectComments(id)
        .then((data) => {
            res.status(200).send({ comments: data })
        })
        .catch((err) => {
            next(err);
    })
}

exports.postComment = (req, res, next) => {
    const comment = req.body;
    const id = req.params.id;
    console.log('controller', req.body)
    return insertComment(comment, id)
        .then((data) => {
            console.log('****', data)
            res.status(201).send({ comment: data })
        })
        .catch((err) => {
            next(err);
    })
}