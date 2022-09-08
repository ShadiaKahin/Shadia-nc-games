const db = require('../db/connection')

exports.updatedReview = (reviewId, newVote) => {
    return db.query(`UPDATE reviews SET votes = votes + ${newVote}
WHERE review_id = ${reviewId}
RETURNING review_id, votes, title, category, designer, owner, review_body, review_img_url, created_at;`
        )
        .then((data) => {
            return data.rows[0]
        })
 
}