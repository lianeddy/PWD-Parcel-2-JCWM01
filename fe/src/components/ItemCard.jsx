import { useSelector } from 'react-redux'
import axios from 'axios'
import { API_URL } from '../constants/API'
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom'
import IDR from '../helper/currency'
import '../assets/styles/itemCard.css'

function ItemCard(props) {
  const user = useSelector(state => state.user.data)
  const limitCategory = useSelector(state => state.limitCategory.limit)
  const cart = useSelector(state => state.cart.itemList)
  const [itemModal, setItemModal] = useState(null)
  const [isAdd, setIsAdd] = useState(false)

  const openModal = (item) => {
    setItemModal(item);
  }

  const closeModal = () => {
    setItemModal(null);
  }

  const addToCart = () => {
    let index = limitCategory.findIndex((cat) => cat.name === props.item.name_category)
    let category = limitCategory[index]
    axios.get(`${API_URL}/cart/count`, {
      params: {
        id_user: user.id_user,
        id_product: props.product.id,
        name_category: props.item.name_category,
      }
    })
      .then((res) => {
        if (res.data[0].jumlah < category.limit) {
          let index = cart.findIndex((item) => item.name_item === props.item.name_item)

          if (index === -1) {
            axios.post(`${API_URL}/cart/add`, {
              id_user: user.id_user,
              id_product: props.product.id,
              name_category: props.item.name_category,
              id_item: props.item.id_item,
              status: "selected",
              stock: props.item.stock_item - 1
            })
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(`Error add to cart: ${err}`);
              })
            setIsAdd(!isAdd)
            props.change()
          } else {
            alert("Product sudah ada dikeranjang")
          }
        } else {
          alert(`Product category ${props.item.name_category} sudah cukup`)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
  }, [isAdd])

  return (
    <div className="item-card" >
      <span class="badge badge-pill item-cat"><i class="fa fa-tags" aria-hidden="true"></i> {props.item.name_category}</span>
      <div className="image">
        <img
          src={props.item.image}
          alt={props.item.name_item} />
      </div>
      <div className="body">
        <div className="d-flex flex-row justify-content-between">
          <div>
            <button
              className="btn-modal"
              onClick={openModal}
            >
              <p className="nameItem">{props.item.name_item}</p>
            </button>
            <p className="priceItem">{IDR(props.item.price_item)}</p>
          </div>
          <button
            onClick={addToCart}
            className="add">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>
        <p className="text-right mr-2 ">Stok : {props.item.stock_item}</p>
      </div>
      {itemModal && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <div className="d-flex flex-row justify-content-end">
              <button className="close-modal" onClick={closeModal}>
                x
              </button>
            </div>
            <div className="container">
              <div className="row mt-5">
                <div className="col-6 card-item">
                  <img
                    src={props.item.image}
                    alt="Item"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="col-6 d-flex flex-column justify-content-center" style={{ backgroundColor: "#F4CBDD80" }}>
                  <p className="mb-1"><span class="badge badge-pill item-cat"><i class="fa fa-tags" aria-hidden="true"></i> {props.item.name_category}</span></p>
                  <h1 className="title-modal">{props.item.name_item}</h1>
                  <p className="price-modal">{IDR(props.item.price_item)}</p>
                  <p>{props.item.description}</p>
                  <p>Stok : {props.item.stock_item}</p>
                  <button
                    onClick={addToCart}
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
