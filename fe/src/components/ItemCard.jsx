import React from 'react'
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
                <p>{props.itemName}</p>
              <button>
                +
              </button>
            </div>
          </div>
      </div>
    )
}

export default ItemCard
