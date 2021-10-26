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
    
    getProfit: (req, res) => {
        let priceProduct;
        let item1;
        let item2;
        let scriptQuery = `SELECT * FROM products where id = ${req.body.id};`
    
        db.query(scriptQuery, (err, results) => {
            if (err) res.status(500).send(err)
            priceProduct = results[0].price;
            let item1query = `SELECT * FROM items where id = 1;`
    
            db.query(item1query, (err, results) => {
                if (err) res.status(500).send(err)
                item1 = results[0].price;
                let item2query = `SELECT * FROM items where id = 2;`
    
                db.query(item2query, (err, results) => {
                    if (err) res.status(500).send(err)
                    item2 = results[0].price;
                    let harga = priceProduct - item1 - item2;
                    res.status(200).send(String(harga));
                })
            })
        })
    
    }
}
