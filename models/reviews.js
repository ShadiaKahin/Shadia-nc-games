const db = require("../db/connection");


exports.selectReviews = (category) => {
    return db.query(`SELECT * FROM reviews,
    (SELECT COUNT(*) FROM comments WHERE comments.review_id = reviews.review_id) 
    AS comment_count FROM reviews
    WHERE reviews.category = ${category}
        ;`)
    .then((data) => {
        console.log('dataaaa', data)
        if (data.rows.length === 0) {
          return Promise.reject({ status: 404, message: 'not found'})
          }
        return data.rows;
    }).catch(error => console.log('CATCH', error))
}



// WHERE  book.book_nme LIKE @search_input AND
// book.book_desc LIKE @search_input AND 
// (@author IS NULL OR book.author LIKE @author) AND
// (@status IS NULL OR bookStatus.status_desc LIKE @status)
