/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {API_URL} from '../constants/API'
import '../assets/styles/detailItem.css'

function DetailItemPage(props) {
    const [item, setItem] = useState({})
    const [itemNotFound, setItemNotFound] = useState(false)
    const [qty, setQty] = useState(1)

    const changeQty = (e) => {
        setQty(e.target.value)
    }

    const fetchItem = () => {
        axios.get(`${API_URL}/items`, {
            params: {
                id: props.match.params.id
            }
        })
        .then((res) => {
            console.log(res.data.data[0]);
            setItem(res.data.data[0])
            setItemNotFound(false)
        })
        .catch((err) => {
            console.log(`Error fetch item : (err)`);
            setItemNotFound(true)
        })
    }

    useEffect(() => {
        fetchItem()
    }, [])

    return (
        <div className="container">
        {itemNotFound ? (
          <div className="alert alert-warning mt-3 ">
            Product with ID {props.match.params.id} has not been
            found
          </div>
        ) : (
          <div className="row mt-5">
            <div className="col-6 card-item">
              <img
                src={item.image}
                alt="Product"
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-6 d-flex flex-column justify-content-center">
              <h4>{item.name_item}</h4>
              <h5>Rp. {item.price_item}</h5>
              <p>{item.description}</p>
              <p><i className="fas fa-tags"></i> {item.name_category}</p>
              <div className="d-flex flex-row align-items-center">
                  <h5 className="mr-2">Qty</h5>
                  <input type="number" name="qty" id="qty" defaultValue={qty} onChange={(e) => changeQty(e)}/>
              </div>
              <button
                className="btn-addto"
              >
                Tambahkan ke keranjang
              </button>
            </div>
          </div>
        )}
      </div>
    )
}

export default DetailItemPage
