/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import Fade from "react-reveal/Fade";
import {API_URL} from '../constants/API'
import IDR from '../helper/currency'
import '../assets/styles/cart.css'

function Cart(props) {
    const stockItems = useSelector(state => state.stock.stockItems)
    const user = useSelector(state => state.user.data)
    const cart = useSelector(state => state.cart.itemList)
    const [isRefresh, setIsRefresh] = useState(false)

    const refresh = () => {
        setIsRefresh(!isRefresh)
    }

    const removeFromCart = (idItem) => {
        let index = stockItems.findIndex((item) => item.id_item === idItem)
        let item = stockItems[index]
        axios.patch(`${API_URL}/cart/remove`, {
            id_item: idItem,
            id_user: user.id_user,
            stock: item.amount + 1
        })
        .then((res) => {
            props.change()
            refresh()
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const renderCart = () => {
        if (cart.length) {
            return cart.map((item, index) => {
                return (
                    <div className="selected" key={index}>
                        <p>{item.name_item}</p>
                        <div className="d-flex flex-row">
                            <button 
                                onClick={() => removeFromCart(item.id_item)}
                                className="minus">
                                <i class="fa fa-minus" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                )
            })
        } else {
            <div></div>
        }
    }

    useEffect(() => {
    }, [isRefresh])

    return (
        <div className="item-selected">
            <p className="product-price">{IDR(props.product.price)}</p>
            <p className="list-title">Product yang dapat dipilih</p>
            <ul className="limit">
                {props.render()}
            </ul>
            <p className="list-title">Product yang dipilih</p>
            <Fade right cascade>
                <div>
                    {renderCart()}
                </div>
            </Fade>
            {cart.length 
                ? <button className="addToCart">
                    Tambah ke pesanan
                  </button>
                : <p>Keranjang masih kosong</p>}
        </div>
    )
}

export default Cart
