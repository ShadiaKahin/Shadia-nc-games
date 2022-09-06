const { selectCategories } = require('../models/categories')


exports.getCategories = (req, res, next) => {
    return selectCategories().then((data) => {
        res.status(200).send({categories: data})
})
}