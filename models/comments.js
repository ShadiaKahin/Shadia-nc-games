const db = require("../db/connection");


exports.selectComments = (id) => {
    if (isNaN(id)) {
      return Promise.reject({ status: 400, message: 'bad request - invalid id' });
    }
        return db.query(
          `SELECT * FROM comments WHERE review_id = ${id}
        ;`)
            .then((data) => {

            if (data.rows.length === 0) {
              return Promise.reject({ status: 404, message: 'not found'})
              }
            return data.rows;
        })
}
