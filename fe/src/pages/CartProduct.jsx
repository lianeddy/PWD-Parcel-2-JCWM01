/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import {API_URL} from '../constants/API'
import Navbarku from '../components/Navbarku'
import '../assets/styles/cartProduct.css'
import CartCard from '../components/CartCard'
import SubTotal from '../components/SubTotal'

function CartProduct() {
    let history = useHistory()
    const dispatch = useDispatch()
    const cartProduct = useSelector(state => state.cartProduct.productList)
    const user = useSelector(state => state.user.data)
    const [totalPrice, setTotalPrice] = useState(0)
    const [listProduct, setListProduct] = useState([])
    const [isRefresh, setIsRefresh] = useState(false)
    const [stock, setStock] = useState([])

    const refresh = () => {
        setIsRefresh(!isRefresh)
    }

    const fetchCartProduct = () => {
        axios.get(`${API_URL}/cart/product`, {
            params: {
                id_user: user.id_user,
            }
        })
        .then((res) => {
            setListProduct(res.data.data)
            dispatch({
                type: "DATA_CART_PRODUCT",
                payload: res.data.data
            })
        })
        .catch((err) => {
            console.log(`Error get Cart Product: ${err}`);
        })
    }

    const fetchStock = () => {
        axios.get(`${API_URL}/items/stock`)
        .then((res) => {
            console.log(res.data.data);
            dispatch({
                type: "DATA_STOCK",
                payload: res.data.data
            })
            setStock(res.data.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const editCart = (idCart, idProduct) => {
        axios.patch(`${API_URL}/cart/edit`, {
            id_user: user.id_user,
            id_cart: idCart
        })
        .then((res) => {
            console.log(res);
            fetchCartProduct()
            history.push(`/items/${idProduct}`)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const deleteFromCart = (product) => {
        product.item.forEach((val) => {
            let index = stock.findIndex((item) => item.id_item === val.id_item)
            console.log(index);
            console.log(stock[index].amount);
            axios.patch(`${API_URL}/cart/return`, {
                stock: stock[index].amount + 1,
                id_stock: val.id_item
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        })

        axios.delete(`${API_URL}/cart`, {
            params: {
                id_user: user.id_user,
                id_cart: product.id
            }
        })
        .then((res) => {
            console.log(res);
            fetchStock()
            refresh()
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const renderCartProduct = () => {
        return listProduct.map((product, index) => {
            return (
                <CartCard 
                    index={index}
                    product={product}
                    editCart={editCart}
                    deleteFromCart={deleteFromCart}
                />
            )
        })
    }

    const sumPrice = () => {
        let sum =  0
        cartProduct.forEach((product) => sum += product.price)
        setTotalPrice(sum)
    }

    useEffect(() => {
       fetchCartProduct()
       sumPrice()
       fetchStock()
    }, [isRefresh])

    return (
        <div className="body-cart-product">
            <Navbarku />
            <div className="container ">
                <div className="d-flex flex-row">
                    <div className="col-9">
                        <h5 className="mt-2">Daftar Pesanan</h5>
                        <div className="container">
                            <div className="row mt-4">
                                {renderCartProduct()}
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <SubTotal 
                            listProduct={listProduct}
                            totalPrice={totalPrice}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProduct
