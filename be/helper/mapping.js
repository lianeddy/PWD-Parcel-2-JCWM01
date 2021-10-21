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

const mapCart = (arr) => {
  let mapData = arr.reduce((temp, val) => {
    if (!temp[val.id_cart]) {
      temp[val.id_cart] = {
        id: val.id_cart,
        id_product: val.id_product,
        name_product: val.name_product,
        image: val.image,
        price: val.price_product,
        item: [
          {
            id_item: val.id_item,
            name_category: val.name_category,
            name_item: val.name_item,
          }
        ]
      }
    } else {
      temp[val.id_cart].item.push({
        id_item: val.id_item,
        name_category: val.name_category,
        name_item: val.name_item,
      })
    }
    return temp
  }, {})

  return Object.keys(mapData).map((key) => mapData[key])
}

module.exports = {
  mapProduct,
  mapCart
}