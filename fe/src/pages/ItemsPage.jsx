/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {API_URL} from '../constants/API'
import '../assets/styles/itemPage.css'
import ItemCard from '../components/ItemCard'

function ItemsPage(props) {
    const [listItem, setListItem] = useState([])
    const [product, setProduct] = useState({})
    const [category, setCategory] = useState([])

    const fetchItems = () => {
        axios.get(`${API_URL}/items`, {
            params: {
                id_product: props.match.params.id
            }
        })
            .then((res) => {
                console.log(res.data.data)
                setListItem(res.data.data)
            })
            .catch((err) => {
                console.log(`Error fetch Item: ${err}`)
            })
    }

    const fetchProductsDetail = () => {
        axios.get(`${API_URL}/products`, {
            params: {
                id: props.match.params.id
            }
        })
        .then((res) => {
            console.log(res.data)
            setProduct(res.data)
            setCategory(res.data.category)
        })
        .catch((err) => {
            console.log(`Error fetch Products : ${err}`)
        })  
    }

    const renderItems = () => {
        return listItem.map((item, index) => {
            return (
                <div key={index}>
                        <ItemCard 
                            image={item.image}
                            itemName={item.name_item}
                            category={item.name_category}
                            id={item.id_item}
                        />
                </div>
            )
        })
    }

    const renderLimit = () => {
        return category.map((cat, index) => {
            return (
                <div key={index}>
                    <p>{cat.name} : {cat.limit}</p>
                </div>
            )
        })
    }

    useEffect(() => {
        fetchItems()
        fetchProductsDetail()
    }, [])

    return (
        <div style={{backgroundColor: "#F4CBDD"}}>
            <div className="page-item-title" style={{paddingBottom: "200px"}}>
                <div className="container text-light">
                    <h2 className="text-center">Parcel Istimewa</h2>
                    <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatum excepturi ducimus saepe, odit nesciunt harum neque aperiam repellat earum vitae modi autem officia itaque, nisi sit cumque, reiciendis veniam.</p>
                </div>
            </div>
            <div className="cards-items-container" style={{marginTop: "-130px"}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                        <div className="selectedItemList">
                            <p>Product : {product.name}</p>
                            <p>Price : {product.price}</p>
                            <p>Jumlah item yang dapat dibeli</p>
                            {renderLimit()}
                            <p className="text-center">item dipilih</p>

                        </div>
                        </div>
                        <div className="col-9">
                            <div className="d-flex flex-row justify-content-between filter-sort ">
                                <div className="fiter-name">
                                    <div className="input-group mb-2 mr-sm-2">
                                        <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-search" aria-hidden="true"></i></div>
                                        </div>
                                        <input type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Cari yang kamu mau"/>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                        <option selected>Pilih Kategori</option>
                                        <option value="cokelat">Cokelat</option>
                                        <option value="snack">Snack</option>
                                        <option value="minuman">Minuman</option>
                                    </select>
                                </div>
                                <div className="sorting">
                                <div className="col-auto">
                                    <select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                        <option selected>Urutkan</option>
                                        <option value="az">A-Z</option>
                                        <option value="za">Z-A</option>
                                    </select>
                                </div>
                                </div>
                            </div>
                            <div className="d-flex flex-wrap flex-row justify-content-between">
                                {renderItems()}
                            </div>
                            <div className="d-flex flex-row justify-content-center mt-2">
                                <div className="page">
                                        <button
                                            className="btn-page"
                                        >
                                            {'<'}
                                        </button>Page <span>1</span> of <span>5</span> {" "}
                                        <button
                                            className="btn-page"
                                        >
                                            {'>'}
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    )
}

export default ItemsPage
