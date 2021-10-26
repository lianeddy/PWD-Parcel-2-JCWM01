import React from 'react'

import IDR from '../helper/currency'

function CartCard({index, product, editCart, deleteFromCart}) {
    return (
        <div className="row card-pesanan mb-2" key={index}>
        <div className="col-4">
            <img
                src={product.image}
                alt="Item"
                style={{ width: "100%" }} />
        </div>
        <div className="col-4 list-item">
            <h4>{product.name_product}</h4>
            {product.item.map((val, idx) => {
                return (
                    <p key={idx}>
                        {val.name_item}
                    </p>
                )
            })}
            <button
                onClick={() => editCart(product.id, product.id_product)}
                className="btn-edit">Edit</button>
        </div>
        <div className="col-4 price-col">
            <h5>{IDR(product.price)}</h5>
            <button
                onClick={() => deleteFromCart(product)}
                className="btn-delete">Delete</button>
        </div>
    </div>
    )
}

export default CartCard
