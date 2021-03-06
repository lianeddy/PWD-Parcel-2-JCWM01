const { db } = require('../database')
const { responses } = require('../helper/responses')
const { mapCart } = require('../helper/mapping')

module.exports =  {
    add: (req, res) => {
        let response
        let {id_user: idUser, id_product: idProduct, name_category: nameCategory, id_item: idItem, stock, status} = req.body
        let scriptQuery = `insert into db_parcel.cart values (${db.escape(idUser)}, ${db.escape(idProduct)}, ${db.escape(nameCategory)}, ${db.escape(idItem)}, ${db.escape(status)}, '-');`

        db.query(scriptQuery, (err, result) => {
            if (err) {
                response = responses("Error get data!", 500, err)
                res.status(500).send(response)
            }

            if (result) {
                let changeStock = `update db_parcel.stocks
                    set amount = ${db.escape(stock)}
                    where id_item = ${db.escape(idItem)};`

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
    getCartProduct: (req, res) => {
        let response
        let {id_user: idUser} = req.query
        let scriptQuery = `select c.id_cart, c.id_product, p.name_product, p.price_product, p.image, c.name_category, i.id_item, i.name_item from items i 
            join cart c
                on i.id_item = c.id_item
            join products p
                on c.id_product = p.id_product
            where c.id_user = ${idUser} and status = 'cart-product';`
        
        db.query(scriptQuery, (err, result) => {
            if (err) {
                response = responses("Error get data!", 500, err)
                res.status(500).send(response)
            } 

            let hasil = mapCart(result)

            response = responses("Success get data cart", 200, hasil)
            res.status(200).send(response)
        })
    },
    remove: (req, res) => {
        let response
        let {id_item: idItem, id_user: idUser, stock} = req.body
        let scriptQuery = `delete from db_parcel.cart where id_item = ${db.escape(idItem)} and id_user = ${db.escape(idUser)};`

        db.query(scriptQuery, (err, result) => {
            if (err) {
                response = responses("Error!", 500, err)
                res.status(500).send(response)
            }

            if (result) {
                let changeStock = `update db_parcel.stocks
                    set amount = ${db.escape(stock)}
                    where id_item = ${db.escape(idItem)};`

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
        let {id_user: idUser, id_product: idProduct, name_category: nameCategory} = req.query
        let scriptQuery = `select count(*) as jumlah from db_parcel.cart
            where id_user = ${idUser} and id_product = ${idProduct} and name_category = ${db.escape(nameCategory)} and status = 'selected';`

        db.query(scriptQuery, (err, result) => {
            if (err) {
                res.status(500).send(err)
            } 

            res.status(200).send(result)
        })
    },
    changeStatus: (req, res) => {
        let response 
        let date = Date.now()
        let idCart = `cart${date}`
        let {id_user: idUser, id_product: idProduct} = req.body
      
        let scriptQuery = `update db_parcel.cart
            set id_cart = ${db.escape(idCart)}, status = 'cart-product'
            where id_user = ${db.escape(idUser)} and id_product = ${db.escape(idProduct)} and status = 'selected' ;`
      
        db.query(scriptQuery, (err, result) => {
            if (err) {
                response = responses("Error!", 500, err)
                res.status(500).send(response)
            } 
      
            response = responses("Sukses tambah ke pesanan", 200, result)
            res.status(200).send(response)
        })
      },
      editCart: (req, res) => {
          let response
          let {id_user: idUser, id_cart: idCart} = req.body
          
        let scriptQuery = `update db_parcel.cart
            set status = 'selected'
            where id_user = ${db.escape(idUser)} and id_cart = ${db.escape(idCart)};`
      
        db.query(scriptQuery, (err, result) => {
            if (err) {
                response = responses("Error!", 500, err)
                res.status(500).send(response)
            } 
      
            response = responses("Sukses edit pesanan", 200, result)
            res.status(200).send(response)
        })
      },
      delete: (req, res) => {
        let response
        let {id_user: idUser, id_cart: idCart} = req.query

        let scriptQuery = `delete from db_parcel.cart 
            where id_user = ${db.escape(idUser)} and id_cart = ${db.escape(idCart)};`

        db.query(scriptQuery, (err, result) => {
            if (err) {
                response = responses("Error!", 500, err)
                res.status(500).send(response)
            } 
      
            response = responses("Sukses delete dari cart", 200, result)
            res.status(200).send(response)
        })
      },
      returnStock: (req, res) => {
        let response
        let {stock, id_item:idItem} = req.body

        let scriptQuery = `update db_parcel.stocks
                    set amount = ${db.escape(stock)}
                    where id_item = ${db.escape(idItem)};`

        db.query(scriptQuery, (err, result) => {
            if (err) {
                response = responses("Error!", 500, err)
                res.status(500).send(response)
            } 
        
            response = responses("Sukses return stock", 200, result)
            res.status(200).send(response)
        })
      }
}

