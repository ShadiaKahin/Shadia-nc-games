const db = require('../db/connection')

exports.updatedReview = (reviewId, newVote) => {
    return db.query(`UPDATE reviews SET votes = votes + ${newVote}
WHERE review_id = ${reviewId}
RETURNING *`
        )
        .then((data) => {
            return data.rows[0]
        })
 
}