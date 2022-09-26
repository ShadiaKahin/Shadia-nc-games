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


exports.insertComment = (comment, id) => {
    // todo - does votes need sending too?
    // todo - if no comment, reject
    console.log('model', comment);
    // if (isNaN(id)) {
    //     return Promise.reject({ status: 400, message: 'bad request - invalid id' });
    // }


    const { author, body } = comment;
    
        return db.query(
          `INSERT INTO comments (
            author, body, review_id 
          ) VALUES ($1, $2, $3) RETURNING *`,
            [author, body, id]
          )
            .then((data) => {
console.log('db returns ', data)
            if (data.rows.length === 0) {
              return Promise.reject({ status: 404, message: 'not found'})
              }
            return data.rows[0];
        })
}

// exports.createRestaurant = (newRestaurant) => {
//     const { restaurant_name, area_id, cuisine, website } = newRestaurant;
//     return db
//       .query(
//         "INSERT INTO restaurants (restaurant_name, area_id, cuisine, website) VALUES  ($1, $2, $3, $4) RETURNING *",
//         [restaurant_name, area_id, cuisine, website]
//       )
//       .then((response) => {
//         return response.rows[0];
//       });
//   };
