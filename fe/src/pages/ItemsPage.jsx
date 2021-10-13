/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Fade from "react-reveal/Fade";
import {API_URL} from '../constants/API'
import '../assets/styles/itemPage.css'
import IDR from '../helper/currency'
import ItemCard from '../components/ItemCard'
import Navbarku from '../components/Navbarku'
import Headerku from '../components/Headerku'

function ItemsPage(props) {
    const [listItem, setListItem] = useState([])
    const [product, setProduct] = useState({})
    const [category, setCategory] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    const fetchItems = () => {
        axios.get(`${API_URL}/items`, {
            params: {
                page: currentPage,
                id_product: props.match.params.id
            }
        })
            .then((res) => {
                console.log(res.data);
                console.log(res.data.data)
                setTotalPage(res.data.total_page)
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
                            price={item.price_item}
                            description={item.description}
                            id={item.id_item}
                        />
                </div>
            )
        })
    }

    const renderLimit = () => {
        return category.map((cat, index) => {
            return (
                <li key={index}>
                    <p>{cat.limit} {cat.name}</p>
                </li>
            )
        })
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const previousPage = () => {
        setCurrentPage(currentPage - 1)
    }

    useEffect(() => {
        fetchItems()
        fetchProductsDetail()
    }, [currentPage])

    return (
        <div style={{backgroundColor: "#E5E5E5"}}>
            <Navbarku />
            <Headerku 
                title={product.name}    
                description={product.description}
            />
            <div className="container d-flex flex-row">
                <div className="col-3">
                    <div className="item-selected">
                        <p className="product-price">{IDR(product.price)}</p>
                        <p className="list-title">Product yang dapat dipilih</p>
                        <ul className="limit">
                            {renderLimit()}
                        </ul>
                        <p className="list-title">Product yang dipilih</p>
                        <div className="selected">
                            <p>Dairy Milk</p>
                            <p>3</p>
                        </div>
                        <div className="selected">
                            <p>Dairy Milk</p>
                            <p>3</p>
                        </div>
                        <div className="selected">
                            <p>Dairy Milk</p>
                            <p>3</p>
                        </div>
                        <div className="selected">
                            <p>Dairy Milk</p>
                            <p>3</p>
                        </div>
                        <div className="selected">
                            <p>Dairy Milk</p>
                            <p>3</p>
                        </div>
                        <div className="selected">
                            <p>Dairy Milk</p>
                            <p>3</p>
                        </div>
                        <button>Tambah ke keranjang</button>
                    </div>
                </div>
                <div className="col-9">
                    <div className="filter-sort d-flex flex-row justify-content-between">
                        <div className="filter-name">
                            <input 
                                type="text" 
                                name="filterName" 
                                id="filterName" 
                                placeholder="Cari yang kamu mau"
                            />
                            <button className="search">
                            <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div className="filter-category">
                            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                <option selected>Pilih Kategori</option>
                                <option value="cokelat">Cokelat</option>
                                <option value="snack">Snack</option>
                                <option value="minuman">Minuman</option>
                            </select>
                        </div>
                        <div className="sorting">
                            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                <option selected>Urutkan</option>
                                <option value="az">A-Z</option>
                                <option value="za">Z-A</option>
                            </select>
                        </div>
                    </div>
                    <Fade bottom cascade>
                    <div className="d-flex flex-wrap flex-row justify-content-center">
                        {renderItems()}
                    </div>
                    </Fade>
                    <div className="d-flex flex-row justify-content-center">
                        <div className="page-info d-flex flex-row justify-content-center">
                            <button 
                                onClick={previousPage}
                                disabled={currentPage === 1 ? true : false}    
                            >
                                <i class="fa fa-chevron-left" aria-hidden="true"></i>
                            </button>
                            <p><span>{currentPage}</span> of <span>{totalPage}</span></p>
                            <button 
                                onClick={nextPage}
                                disabled={currentPage === totalPage ? true : false} 
                            >
                                <i class="fa fa-chevron-right" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemsPage
