import React from 'react'
import '../assets/styles/productCard.css'
import next from '../assets/images/next.png'
import { Link } from 'react-router-dom'
import IDR from '../helper/currency'

function ProductCard(props) {
    return (
        <div className="card card-product">
                <div className="card-head">
                    <img 
                        src={props.image}
                        alt="product"
                        />
                </div>
                <div className="card-body">
                    <h4>{props.title}</h4>
                    <p>{props.description}</p>
                    <div>
                        <h5>{IDR(props.price)}</h5>
                    <Link style={{ textDecoration: "none", color: "inherit" }}
                        to={`/items/${props.id}`}>
                        <button className="next">
                        <img src={next} alt="next" />
                        </button>
                    </Link>
                    </div>
                </div>
            </div>
    )
}

export default ProductCard
