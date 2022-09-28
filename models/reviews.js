const db = require("../db/connection");


exports.selectReviews = (review_id, category) => {
  
  let reviewId;

    let queryStr = `SELECT reviews.*,     
    (SELECT COUNT(*) FROM comments WHERE comments.review_id = reviews.review_id) 
    AS comment_count FROM reviews`;

  if (review_id && (typeof parseInt(review_id, 10)) === 'number') {
    reviewId = parseInt(review_id, 10);
  }
  
    // if (isNaN(reviewId)) {
    //   return Promise.reject({ status: 400, message: 'bad request - invalid id' });
    // }

    if (review_id) {
      queryStr += ` WHERE reviews.review_id = ${reviewId};`
    }
  
    if (category) {
      queryStr += ` WHERE reviews.category = ${category};`
    }
  
        return db.query(queryStr)
        .then((data) => {
            if (data.rows.length === 0) {
              return Promise.reject({ status: 404, message: 'not found'})
              }
            return data.rows;
        })
}
