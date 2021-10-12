const { db } = require('../database')
const { responses } = require('../helper/responses')
const { mapProduct } = require('../helper/mapping')

module.exports = {
    getData: (req, res) => {
        let { id: idProduct } = req.query

        let withDetail = ''

        if (idProduct) {
            let parseIdProduct = Math.round(idProduct)
            if (!parseIdProduct) {
                response = responses("invalid product id!", 400, null)
                res.status(400).send(response)
            } else {
                withDetail = `where p.id_product = ${db.escape(parseIdProduct)}`
            }
        }
        
        let scriptQuery = `select p.id_product, p.name_product, p.price_product, p.description, p.image, c.name_category, l.quantity as limit_item from categories c
        join limit_item l
            on c.id_category = l.id_category
        join products p
            on l.id_product = p.id_product
        ${withDetail};`

        db.query(scriptQuery, (err, results) => {
            if (err) {
                response = responses("Error get detail product!", 500, err)     
                res.status(500).send(response)
            }

            let hasil = mapProduct(results)
            if (idProduct) {
                hasil = hasil[0]
            }

            res.status(200).send(hasil)
        })
    },    
}