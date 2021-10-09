const mapProduct = (arr) => {
  let mapData = arr.reduce((temp, val) => {
    if (!temp[val.name_product]) {
      temp[val.name_product] = {
        id: val.id_product,
        name: val.name_product,
        description: val.description,
        image: val.image,
        price: val.price_product,
        category: [
          {
            name: val.name_category,
            limit: val.limit_item,
          }
        ]
      }
    } else {
      temp[val.name_product].category.push({
        name: val.name_category,
        limit: val.limit_item,
      })
    }
    return temp
  }, {})

  return Object.keys(mapData).map((key) => mapData[key])
}

module.exports = {
  mapProduct
}