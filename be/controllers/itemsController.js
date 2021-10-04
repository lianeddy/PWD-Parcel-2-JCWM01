const { db } = require('../database')

module.exports = {
    getData: (req, res) => {
        let scriptQuery = `select i.id_item, i.name_item, c.name_category, s.amount, i.description, i.image from items i
        join categories c
                on i.id_category = c.id_category
        join stocks s
                on i.id_stock = s.id_stock;`
        
        db.query(scriptQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    
}