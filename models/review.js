const db = require("../db/connection");


exports.selectReview = (id) => {
    if (isNaN(id)) {
      return Promise.reject({ status: 400, message: 'bad request - invalid id' });
    }
        return db.query(
          `SELECT reviews.*, 
          (SELECT COUNT(*) FROM comments WHERE comments.review_id = reviews.review_id) 
          AS comment_count FROM reviews
          WHERE reviews.review_id = ${id}
        ;`)
        .then((data) => {
            if (data.rows.length === 0) {
              return Promise.reject({ status: 404, message: 'not found'})
              }
            return data.rows[0];
        })
}
