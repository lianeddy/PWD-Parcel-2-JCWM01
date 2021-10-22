/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {API_URL} from '../constants/API'
import IDR from '../helper/currency'
import Navbarku from '../components/Navbarku'
import '../assets/styles/cartProduct.css'

function CartProduct() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.data)
    const [totalPrice, setTotalPrice] = useState(0)
    const [listProduct, setListProduct] = useState([])

    const fetchCartProduct = () => {
        axios.get(`${API_URL}/cart/product`, {
            params: {
                id_user: user.id_user,
            }
        })
        .then((res) => {
            console.log("Cart:");
            console.log(res.data.data);
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

    const renderCartProduct = () => {
        return listProduct.map((product, index) => {
            return (
                <div className="row card-pesanan mb-2" key={index}>
                    <div className="col-4">
                        <img
                            src={product.image}
                            alt="Item"
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className="col-4 list-item">
                        <h4>{product.name_product}</h4>
                        {product.item.map((val, idx) => {
                            return (
                                <p key={idx}>
                                    {val.name_item}
                                </p>
                            )
                        })}
                        <button className="btn-edit">Edit</button>
                    </div>
                    <div className="col-4 price-col">
                        <h5>{IDR(product.price)}</h5>
                        <button className="btn-delete">Delete</button>
                    </div>
                </div>
            )
        })
    }

    const sumPrice = () => {
        let sum =  0
        listProduct.forEach((product) => sum += product.price)
        setTotalPrice(sum)
    }

    useEffect(() => {
       fetchCartProduct()
       sumPrice()
    }, [])

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
                        <div className="totalprice">
                            <div className="justify-content-between">
                                <p>Subtotal :</p>
                                <p>{listProduct.length} Parcel</p>
                                <p>{IDR(totalPrice)}</p>
                            </div>
                            <button>Lakukan Pembayaran</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProduct
