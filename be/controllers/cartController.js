const { db } = require('../database')
const { responses } = require('../helper/responses')

module.exports =  {
    add: (req, res) => {
        let response
        let {id_user, id_product, name_category, id_item, stock, status} = req.body
        let scriptQuery = `insert into db_parcel.cart values (${db.escape(id_user)}, ${db.escape(id_product)}, ${db.escape(name_category)}, ${db.escape(id_item)}, ${db.escape(status)});`

        db.query(scriptQuery, (err, result) => {
            if (err) {
                response = responses("Error get data!", 500, err)
                res.status(500).send(response)
            }

            if (result) {
                let changeStock = `update db_parcel.stocks
                    set amount = ${db.escape(stock)}
                    where id_item = ${db.escape(id_item)};`

                db.query(changeStock, (err2, result2) => {
                    if (err2) {
                        response = responses("Error get data!", 500, err)
                        res.status(500).send(response)
                    }

                    response = responses("Success add to cart", result)
                    res.status(200).send(response)
                })
            }
        })
    },
    getCart: (req, res) => {
        let response
        let {id_user: idUser, id_product: idProduct, status} = req.query
        let scriptQuery = `select i.id_item, i.name_item from items i 
                                join cart c
                                    on i.id_item = c.id_item
                            where c.id_user = ${db.escape(idUser)} and c.id_product = ${db.escape(idProduct)} and c.status = ${db.escape(status)};`

        db.query(scriptQuery, (err, result) => {
            if (err) {
                response = responses("Error get data!", 500, err)
                res.status(500).send(response)
            } 

            response = responses("Success get data cart", 200, result)
            res.status(200).send(response)
        })
    },
    remove: (req, res) => {
        let response
        let {id_item, id_user, stock} = req.body
        let scriptQuery = `delete from db_parcel.cart where id_item = ${db.escape(id_item)} and id_user = ${db.escape(id_user)};`

        db.query(scriptQuery, (err, result) => {
            if (err) {
                response = responses("Error!", 500, err)
                res.status(500).send(response)
            }

            if (result) {
                let changeStock = `update db_parcel.stocks
                    set amount = ${db.escape(stock)}
                    where id_item = ${db.escape(id_item)};`

                db.query(changeStock, (err2, result2) => {
                    if (err2) {
                        response = responses("Error!", 500, err)
                        res.status(500).send(response)
                    }

                    response = responses("Success remove from cart", result)
                    res.status(200).send(response)
                })
            }
        })
    },
    countCategory: (req, res) => {
        let {id_user, id_product, name_category} = req.query
        let scriptQuery = `select count(*) as jumlah from db_parcel.cart
            where id_user = ${id_user} and id_product = ${id_product} and name_category = ${db.escape(name_category)};`

        db.query(scriptQuery, (err, result) => {
            if (err) {
                res.status(500).send(err)
            } 

            res.status(200).send(result)
        })
    },
    // changeStatus: (req, res) => {
    //     let response 
    //     let {id_user: idUser, id_product: idProduct} = req.query

    //     let scriptQuery = ``
    // }
}

