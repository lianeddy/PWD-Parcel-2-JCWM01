import React from 'react'
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import '../assets/styles/navbarku.css'
import logo from '../assets/images/Vector.png'
import foto from '../assets/images/image.png'
import cart from '../assets/images/cart.png'


function Navbarku() {
    const cartProduct = useSelector(state => state.cartProduct.productList)
    return (
        <div className="navbar" >
            <navbar className="container-fluid">
                    <Link to="/products">
                        <div className="brand">
                            <img src={logo} alt="logo" />
                            <p>parselio</p>
                        </div>
                    </Link>
                    <div className="nav-right">
                        <Link to="/cart-product">
                            <img className="cart" src={cart} alt="cart" />
                            <span class="badge badge-pill badge-primary">{cartProduct.length}</span>
                        </Link>
                        <img className="foto" src={foto} alt="foto" />
                    </div>
            </navbar>
        </div>
    )
}

export default Navbarku
