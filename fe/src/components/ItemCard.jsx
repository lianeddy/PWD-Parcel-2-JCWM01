import React, {useState} from 'react'
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom'
import IDR from '../helper/currency'
import '../assets/styles/itemCard.css'

function ItemCard(props) {
  const [itemModal, setItemModal] = useState(null)

  const openModal = (item) => {
    setItemModal(item);
  }

  const closeModal = () => {
    setItemModal(null);
  }

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
              <div>
                <button 
                  className="btn-modal"
                  onClick={() => openModal(props)}
                >
                  <p className="nameItem">{props.itemName}</p>
                </button>
                <p className="priceItem">{IDR(props.price)}</p>
              </div>
              <button className="add">
                +
              </button>
            </div>
          </div>
          {itemModal && (
            <Modal isOpen={true} onRequestClose={closeModal}>
              <Zoom>
                <div className="d-flex flex-row justify-content-end">
                  <button className="close-modal" onClick={closeModal}>
                    x
                  </button>
                </div>
              <div className="container" style={{backgroundColor: "#F4CBDD80;"}}>
                  <div className="row mt-5">
                    <div className="col-6 card-item">
                      <img
                        src={itemModal.image}
                        alt="Item"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center">
                      <p className="mb-1"><span class="badge badge-pill item-cat"><i class="fa fa-tags" aria-hidden="true"></i> {itemModal.category}</span></p>
                      <h1 className="title-modal">{itemModal.itemName}</h1>
                      <p className="price-modal">{IDR(itemModal.price)}</p>
                      <p>{itemModal.description}</p>
                      <button
                        className="btn-addto"
                      >
                        Tambahkan ke daftar pilihan
                      </button>
                    </div>
                </div>
              </div>
              </Zoom>
            </Modal>
          )}
      </div>
    )
}

export default ItemCard
