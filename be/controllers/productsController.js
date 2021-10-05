const { db } = require('../database')

module.exports = {
    getData: (req, res) => {
        let scriptQuery = `SELECT * FROM db_parcel.products;`
        if (req.query.id) {
            scriptQuery = `SELECT * FROM db_parcel.products WHERE id_product = ${db.escape(req.query.id)};`
        }
        
        db.query(scriptQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    
}