const {updatedReview} = require('../models/patch-review')

exports.patchReview = () => {
    return updatedReview()
        .then((data) => {
        console.log(data, 'in controller')
    })
}
