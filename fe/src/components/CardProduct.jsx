import React, { Component } from 'react'
import '../assets/styles/cardProduct.css'

class CardProduct extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-head">
                    <img 
                        src={this.props.image}
                        alt="product"
                        />
                </div>
                <div className="card-body">
                    <h5>{this.props.title}</h5>
                    <p>Rp. {this.props.price}</p>
                    <p>{this.props.description}</p>
                </div>
            </div>
        )
    }
}

export default CardProduct;
