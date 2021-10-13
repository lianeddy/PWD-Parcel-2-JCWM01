const { db } = require('../database')
const bcrypt = require('bcryptjs');

module.exports = {
    register: (req, res) => {

        let userQuery = `insert into users values (2, '${req.body.email}', '${req.body.password}', 0, 0);`;
        db.query(userQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
    }
}