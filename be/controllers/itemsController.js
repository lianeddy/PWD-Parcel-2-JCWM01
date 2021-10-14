const { db } = require('../database')
const { responses } = require('../helper/responses')

const limit = 9

module.exports = {
    getData: (req, res) => {
        let {page, name, sort, id: idItem, id_product: idProduct, id_category: category} = req.query
        let response
        let limitQuery = ''
        let countLength = 0
        let parsePage = Math.round(page)
        let sortBy = ''

        if (sort) {
            if (sort == 'az') {
                sortBy = `order by i.name_item asc`
            } else if (sort == 'za') {
                sortBy = `order by i.name_item desc`
            } else if (sort == 'rendah') {
                sortBy = `order by i.price_item asc`
            } else if (sort == 'tinggi') {
                sortBy = `order by i.price_item desc`
            } 
        }
        
        if (parsePage) {
            const offset = (parsePage - 1) * limit
            limitQuery = `limit ${limit} offset ${offset}`
        }

        let scriptQuery = `select i.id_item, i.name_item, i.price_item, c.name_category, s.amount, i.description, i.image from items i
        join categories c
                on i.id_category = c.id_category
        join stocks s
                on i.id_stock = s.id_stock ${limitQuery};`

        if (idItem) {
            scriptQuery = `select i.id_item, i.name_item, i.price_item, c.name_category, s.amount as stock, i.description, i.image from items i
            join categories c
                    on i.id_category = c.id_category
            join stocks s
                    on i.id_stock = s.id_stock
                    where i.id_item = ${db.escape(idItem)};`
        }

        if (idProduct) {
            scriptQuery = `select i.id_item, i.name_item, i.price_item, c.name_category, s.amount as stock_item, l.quantity as limit_per_category, i.description, i.image from items i
                join categories c 
                    on i.id_category = c.id_category
                join stocks s
                    on i.id_stock = s.id_stock
                join limit_item l 
                    on c.id_category = l.id_category
                join products p 
                    on l.id_product = p.id_product
                where p.id_product= ${db.escape(idProduct)} ${sortBy} ${limitQuery};`
        }

        if (idProduct && category) {
            scriptQuery = `select i.id_item, i.name_item, i.price_item, c.name_category, s.amount as stock_item, l.quantity as limit_per_category, i.description, i.image from items i
                join categories c 
                    on i.id_category = c.id_category
                join stocks s
                    on i.id_stock = s.id_stock
                join limit_item l 
                    on c.id_category = l.id_category
                join products p 
                    on l.id_product = p.id_product
                where p.id_product= ${db.escape(idProduct)} and i.id_category = ${db.escape(category)} ${limitQuery};`
        }

        if (idProduct && name) {
            let concateName = '%' + name + '%'
            scriptQuery = `select i.id_item, i.name_item, i.price_item, c.name_category, s.amount as stock_item, l.quantity as limit_per_category, i.description, i.image from items i
                join categories c 
                    on i.id_category = c.id_category
                join stocks s
                    on i.id_stock = s.id_stock
                join limit_item l 
                    on c.id_category = l.id_category
                join products p 
                    on l.id_product = p.id_product
                where p.id_product= ${db.escape(idProduct)} and i.name_item like '${concateName}' ${limitQuery};`
        }

        if (parsePage && idProduct) {
            let countPage = `select count(*) as count from items i
            join categories c 
                on i.id_category = c.id_category
            join stocks s
                on i.id_stock = s.id_stock
            join limit_item l 
                on c.id_category = l.id_category
            join products p 
                on l.id_product = p.id_product
            where p.id_product= ${db.escape(idProduct)};`

            db.query(countPage, (err, results) => {
                if (err) {
                    response = responses("Unable get pagination!", 500, err)
                    res.status(500).send(response)
                }
    
                countLength = Math.round(results[0].count/limit)
            })
        }

        if (parsePage && idProduct && category) {
            let countPage = `select count(*) as count from items i
            join categories c 
                on i.id_category = c.id_category
            join stocks s
                on i.id_stock = s.id_stock
            join limit_item l 
                on c.id_category = l.id_category
            join products p 
                on l.id_product = p.id_product
            where p.id_product= ${db.escape(idProduct)} and i.id_category = ${db.escape(category)};`

            db.query(countPage, (err, results) => {
                if (err) {
                    response = responses("Unable get pagination!", 500, err)
                    res.status(500).send(response)
                }
    
                countLength = Math.round(results[0].count/limit)
            })
        }
        
        db.query(scriptQuery, (err, results) => {
            if (err) {
                response = responses("Error get data!", 500, err)
                res.status(500).send(response)
            }

            if (parsePage > countLength) {
                response = responses("Error invalid page of item product", 400, null)
                res.status(400).send(response)
                return
            }

            let pagination = {}
            if (parsePage) {
                pagination = {
                    total_page: countLength,
                    page: parsePage
                }
            }

            response = responses("Success get data item product", 200, results, pagination)
            res.status(200).send(response)
        })
    },
    
}