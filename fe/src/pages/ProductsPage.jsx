import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../redux/actions/productsAction";
import '../assets/styles/productsPage.css'
import CardProduct from '../components/CardProduct';

class ProductsPage extends Component {

    renderProducts = () => {
        return this.props.productsGlobal.productList.map((product, index) => {
            return (
                <div key={index}>
                    <Link style={{ textDecoration: "none", color: "inherit" }}
                        to={`/items/${product.id_product}`}>
                        <CardProduct 
                            image= {product.image}
                            title={product.name_product}
                            price={product.price_product}
                            description={product.description}
                        />
                    </Link>
                </div>
            )
        })
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {
        return (
            <div style={{backgroundColor: "#F4CBDD"}}>
              <div className="page-title" style={{paddingBottom: "200px"}}>
                    <div className="container text-light">
                        <h2 className="text-center">Parcel Istimewa</h2>
                        <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatum excepturi ducimus saepe, odit nesciunt harum neque aperiam repellat earum vitae modi autem officia itaque, nisi sit cumque, reiciendis veniam.</p>
                    </div>
                </div>
                <div className="cards-container" style={{marginTop: "-130px"}}>
                    {this.renderProducts()}
                </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      productsGlobal: state.products,
    };
};

const mapDispatchToProps = {
    fetchProducts,
  };

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
