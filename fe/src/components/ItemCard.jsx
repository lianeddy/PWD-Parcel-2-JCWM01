import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/itemCard.css'

function ItemCard(props) {
    return (
        <div className="item-card" >
          <span class="badge badge-pill item-cat"><i class="fa fa-tags" aria-hidden="true"></i> {props.category}</span>
            <div className="image">
                <img
                    src={props.image} 
                    alt={props.itemName}/>
            </div>
          <div >
            <div className="body d-flex flex-row justify-content-between">
              <Link
                style={{color: "inherit" }}
                to={`/detail/${props.id}`}
              >
                <p>{props.itemName}</p>
              </Link>
              <button>
                +
              </button>
            </div>
          </div>
      </div>
    )
}

export default ItemCard
