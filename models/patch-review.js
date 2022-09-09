const db = require('../db/connection')

exports.updatedReview = (reviewId, newVote) => {
    return db.query(`UPDATE reviews SET votes = votes + $1
WHERE review_id = $2 RETURNING *;`, [newVote, reviewId] 
        )
        .then((data) => {
            console.log(data.rows)
            if (data.rows.length === 0) {
              return Promise.reject({ status: 404, message: 'not found'})
              }
            return data.rows[0];
        })
}