import React, { Component } from 'react'
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import '../assets/styles/cardItem.css'

class CardItems extends Component {
    render() {
        return (
            <div className="card item-card" style={{width: '220px', margin: '5px 0px 0px 5px'}}>
                <div className="d-flex flex-row justify-content-center">
                    <img
                        src={this.props.image} 
                        alt={this.props.itemName}/>
                </div>
        <div className="mt-2">
          <div>
          <Link
              style={{color: "inherit" }}
              to={`/detail/${this.props.id}`}
            >
              <h6>{this.props.itemName}</h6>
            </Link>
            <span className="text-muted">
            <i class="fas fa-tags"></i> {this.props.category}
            </span>
          </div>
          <div>
            <div className="d-flex flex-row justify-content-end">
                <button
                    onClick={this.addToCartHandler}
                    className="btn-pilih"
                >
                    Pilih
                </button>
            </div>
          </div>
        </div>
      </div>
        )
    }
}

export default CardItems;
