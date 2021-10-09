import React from 'react'
import '../assets/styles/productCard.css'

function ProductCard(props) {
    return (
        <div className="card">
                <div className="card-head">
                    <img 
                        src={props.image}
                        alt="product"
                        />
                </div>
                <div className="card-body">
                    <h5>{props.title}</h5>
                    <p>Rp. {props.price}</p>
                    <p>{props.description}</p>
                </div>
            </div>
    )
}

export default ProductCard
