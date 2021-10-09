import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/itemCard.css'

function ItemCard(props) {
    return (
        <div className="card item-card" style={{width: '220px', margin: '5px 0px 0px 5px'}}>
                <div className="d-flex flex-row justify-content-center">
                    <img
                        src={props.image} 
                        alt={props.itemName}/>
                </div>
        <div className="mt-2">
          <div>
          <Link
              style={{color: "inherit" }}
              to={`/detail/${props.id}`}
            >
              <h6>{props.itemName}</h6>
            </Link>
            <span className="text-muted">
            <i className="fas fa-tags"></i> {props.category}
            </span>
          </div>
          <div>
            <div className="d-flex flex-row justify-content-end">
                <button
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

export default ItemCard
