const {db} = require('../database')


module.exports = {
    getData: (req, res) => { 
        let scriptQuery = `Select * from items;`
        if (req.query.name_item) {
            scriptQuery = `Select * from items where name_item = ${db.escape(req.query.name_item)};`
        }
        db.query(scriptQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
           
        })
    }
    ,getPage: (req, res) => { 
        let scriptQuery = `Select * from items;`
        let page = req.params.id1.split(',')
        if (req.query.name_item) {
            scriptQuery = `Select * from items where name_item = ${db.escape(req.query.name_item)};`
        }
        db.query(scriptQuery, (err, results) => {
            if (err) res.status(500).send(err)

            db.query(`Select * from items limit ${(page[0])}, ${(page[1])};`, (err2, results2) => {
               if (err2) res.status(500).send(err2)
               res.status(200).send(results2)
            })
        })
    }
    ,addData: (req, res) => {
        console.log(req.body);
        let { name_item, price_item, id_category, id_stock, image, description } = req.body
        if (id_category == "Coklat"){
            id_category = 1
        }
        if (id_category == "Snack"){
            id_category = 2
        }
        if (id_category == "Minuman"){
            id_category = 3
        }
        let insertQuery = `Insert into items values (null,${db.escape(name_item)},${db.escape(price_item)},${db.escape(id_category)},${db.escape(id_stock)},${db.escape(image)},${db.escape(description)});`
        console.log(insertQuery);
        db.query(insertQuery, (err, results) => {
            if (err) res.status(500).send(err)

            db.query(`Select * from items where name_item = ${db.escape(req.query.name_item)};`, (err2, results2) => {
                if (err2) res.status(500).send(err2)
                res.status(200).send({message: `Penambahan items Berhasil`, data: results2 })
            })
        })
    }
    ,editData: (req, res) => {
        // let dataUpdate = []
        // let prop =
        // for (let prop in req.body){
        //     dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`)
        // }
        let { name_item, price_item, id_category, id_stock, image, description } = req.body
        if (id_category == "Coklat"){
            id_category = 1
        }
        if (id_category == "Snack"){
            id_category = 2
        }
        if (id_category == "Minuman"){
            id_category = 3
        }

        let updateQuery =`UPDATE items set name_item = ${db.escape(name_item)}, price_item = ${db.escape(price_item)}, id_category = ${db.escape(id_category)}, id_stock = ${db.escape(id_stock)}, image = ${db.escape(image)}, description = ${db.escape(description)} where id_item = ${req.params.id2};`
        console.log(updateQuery);
        db.query(updateQuery, (err,results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
    }
    ,deleteData: (req, res) => {
        let deleteQuery = `DELETE from items where id_item = ${req.params.id3};`
        console.log(deleteQuery);
        db.query(deleteQuery, (err,results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })

    }

}

