const db = require("../db/connection");


exports.selectReview = (id) => {
    return db.query(`SELECT * FROM reviews WHERE ${id} = review_id;`)
        .then((data) => {
            if (data.rows.length === 0) {
                return Promise.reject({ status: 404, message: 'not found'})
               }
            return data.rows
        })
    
    
}