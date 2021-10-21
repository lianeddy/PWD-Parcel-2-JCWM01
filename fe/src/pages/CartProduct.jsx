import React from 'react'
import Navbarku from '../components/Navbarku'

function CartProduct() {
    return (
        <div className="body-cart" style={{backgroundColor: "#E5E5E5"}}>
            <Navbarku />
            <div className="container ">
                <div className="d-flex flex-row">
                    <div className="col-9">
                        <h5 className="header-pesanan">Daftar Pesanan</h5>
                        <div className="container">
                            <div className="row mt-4">
                                <div className="col-4 card-pesanan">
                                <img
                                    src="https://cdn.idntimes.com/content-images/community/2017/06/020307fb84e82ad2d83c117b29261d4f-4c7711f9569ebff66329d375e869a02e.jpg"
                                    alt="Item"
                                    style={{ width: "100%" }}
                                />
                                </div>
                                <div className="col-4 d-flex flex-column justify-content-center" style={{backgroundColor: "#F4CBDD80"}}>
                                    <h4>Parcel2</h4>
                                    <p>dddddddddddddd</p>
                                    <p>dddddddddddddd</p>
                                    <p>dddddddddddddd</p>
                                    <p>dddddddddddddd</p>
                                    <button>Edit</button>
                                </div>
                                <div className="col-4 d-flex flex-row justify-content-center">
                                    <h5>Rp.200000</h5>
                                    <button>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <h5 className="header-pesanan">Proses</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProduct
