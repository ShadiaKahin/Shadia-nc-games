const {selectUsers} = require('../models/users')


exports.getUsers = (req, res, next) => {
    return selectUsers()
        .then((data) => {
        res.status(200).send({user: data})
    })
}