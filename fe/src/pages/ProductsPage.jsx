import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {API_URL} from '../constants/API'
import '../assets/styles/productPage.css'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const ProductsPage = () => {
    const [productList, setProductList] = useState([]);

    const fetchProducts = () => {
        axios.get(`${API_URL}/products`)
        .then((res) => {
            console.log(res.data);
            setProductList(res.data)
        })
        .catch((err) => {
            console.log(`Error fetch Products : ${err}`);
        })  
    }

    const renderProducts = () => {
        return productList.map((product, index) => {
            return (
                <div key={index}>
                    <Link style={{ textDecoration: "none", color: "inherit" }}
                        to={`/items/${product.id}`}>
                        <ProductCard 
                            image= {product.image}
                            title={product.name}
                            price={product.price}
                            description={product.description}
                        />
                    </Link>
                </div>
            )
        })
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div style={{backgroundColor: "#F4CBDD"}}>
            <div className="page-title" style={{paddingBottom: "200px"}}>
                <div className="container text-light">
                    <h2 className="text-center">Parcel Istimewa</h2>
                    <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatum excepturi ducimus saepe, odit nesciunt harum neque aperiam repellat earum vitae modi autem officia itaque, nisi sit cumque, reiciendis veniam.</p>
                </div>
            </div>
            <div className="cards-container" style={{marginTop: "-130px"}}>
                {renderProducts()}
            </div>
        </div>
    )
}

export default ProductsPage
