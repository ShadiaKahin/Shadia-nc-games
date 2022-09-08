const db = require('../db/connection')

exports.updatedReview = () => {
    return db.query('SELECT * FROM reviews')
        .then((data) => {
        console.log(data, 'in model')
    })
}