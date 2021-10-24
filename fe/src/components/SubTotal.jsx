import React from 'react'

import IDR from '../helper/currency'

function SubTotal({listProduct, totalPrice}) {
    return (
    <div className="totalprice">
        <div className="justify-content-between">
            <p>Subtotal :</p>
            <p>{listProduct.length} Parcel</p>
            <p>
                {IDR(totalPrice)}
            </p>
        </div>
        <button>Lakukan Pembayaran</button>
    </div>
    )
}

export default SubTotal
