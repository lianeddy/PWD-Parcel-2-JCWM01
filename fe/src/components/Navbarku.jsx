import React from 'react'
import '../assets/styles/navbarku.css'
import logo from '../assets/images/Vector.png'
import foto from '../assets/images/image.png'
import cart from '../assets/images/cart.png'


function Navbarku() {
    return (
        <div className="navbar" >
            <navbar className="container">
                    <div className="brand">
                        <img src={logo} alt="logo" />
                        <p>e-parcel</p>
                    </div>
                    <div className="nav-right">
                        <img className="cart" src={cart} alt="cart" />
                        <span class="badge badge-pill badge-primary">0</span>
                        <img className="foto" src={foto} alt="foto" />
                    </div>
            </navbar>
        </div>
    )
}

export default Navbarku
