import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {API_URL} from '../constants/API'
import '../assets/styles/productPage.css'
import ProductCard from '../components/ProductCard'
import Navbarku from '../components/Navbarku'
import Headerku from '../components/Headerku'
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
                        <ProductCard 
                            image= {product.image}
                            title={product.name}
                            price={product.price}
                            description={product.description}
                            id={product.id}
                        />
                </div>
            )
        })
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div style={{backgroundColor: "#E5E5E5"}}>
                <Navbarku />
                <Headerku 
                    title="Parcel Istimewa" 
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatum excepturi ducimus saepe, odit nesciunt harum neque aperiam repellat earum vitae modi autem officia itaque, nisi sit cumque, reiciendis veniam."
                />
            <div className="cards-container">
                {renderProducts()}
            </div>
        </div>
    )
}

export default ProductsPage
