/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import Fade from "react-reveal/Fade";
import {API_URL} from '../constants/API'
import IDR from '../helper/currency'
import '../assets/styles/cart.css'

function Cart(props) {
    let dispatch = useDispatch()
    const stockItems = useSelector(state => state.stock.stockItems)
    const user = useSelector(state => state.user.data)
    const cart = useSelector(state => state.cart.itemList)
    const limitCategory = useSelector(state => state.limitCategory.limit)
    const [limit, setLimit] = useState(0)
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
        .then(() => {
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

    const fetchCartProduct = () => {
        axios.get(`${API_URL}/cart/product`, {
            params: {
                id_user: user.id_user,
            }
        })
        .then((res) => {
            console.log("Cart:");
            console.log(res.data.data);
            dispatch({
                type: "DATA_CART_PRODUCT",
                payload: res.data.data
            })
            alert("Product berhasil ditambahkan ke daftar pesanan")
        })
        .catch((err) => {
            console.log(`Error get Cart Product: ${err}`);
        })
    }

    const addOrder = () => {
        if (cart.length < limit) {
            alert("Product yang dipilih masih kurang")
        } else {
            axios.patch(`${API_URL}/cart/addorder`, {
                id_user: user.id_user,
                id_product: props.idProduct
            })
            .then((res) => {
                fetchCartProduct()
                refresh()
                props.change()
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    const countLimit = () => {
        let count = 0
        limitCategory.forEach((item) => count += item.limit)
        setLimit(count)
    }

    useEffect(() => {
        countLimit()
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
                ? <button 
                    // disabled={cart.length < limit ? true : false}
                    onClick= {() => addOrder()}
                    className="addToCart">
                        Tambah ke pesanan
                    </button>
                : <p>Keranjang masih kosong</p>}
        </div>
    )
}

export default Cart
