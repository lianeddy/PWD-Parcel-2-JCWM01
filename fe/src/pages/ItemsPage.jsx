import axios from 'axios';
import React, { Component } from 'react'
import {API_URL} from '../constants/API'
import '../assets/styles/itemsPage.css'
import CardItems from '../components/CardItems';

class ItemsPage extends Component {
    state = {
        itemsList: [],
        page: 1,
        maxPage: 0,
        itemPerPage: 6,
        product: {},
    }

    renderItems = () => {
        const beginningIndex = (this.state.page - 1) * this.state.itemPerPage;

        const currentData = this.state.itemsList.slice(
            beginningIndex,
            beginningIndex + this.state.itemPerPage
          );

        return currentData.map((item, index) => {
            return (
                <div key={index}>
                        <CardItems 
                            image={item.image}
                            itemName={item.name_item}
                            category={item.name_category}
                        />
                </div>
            )
        })
    }

    nextPagehandler = () => {
        if (this.state.page < this.state.maxPage) {
          this.setState({ page: this.state.page + 1 });
        }
      };
    
      prevPagehandler = () => {
        if (this.state.page > 1) {
          this.setState({ page: this.state.page - 1 });
        }
      };

    fetchItems = () => {
        axios.get(`${API_URL}/items/get`)
        .then((res) => {
            this.setState({
                itemsList: res.data,
                maxPage: Math.ceil(res.data.length / this.state.itemPerPage),
                filteredProductList: res.data,
            })
        })
        .catch((err) => {
            console.log(`ERROR Fetch Items : ${err}`);
        })
    }

    fetchProduct = () => {
        axios.get(`${API_URL}/products/get`, {
            params: {
                id: this.props.match.params.index
            },
        })
        .then((result) => {
            console.log(result.data[0]);
            this.setState({product: result.data[0]})
        })
    }

    componentDidMount(){
        console.log(this.props.match.params.index);
        this.fetchItems();
        this.fetchProduct();
    }

    render() {
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
                            <div className="cardProduct">
                                <div className="cardProduct-head">
                                    <img 
                                        src={this.state.product.image}
                                        alt={this.state.product.name_product}
                                        />
                                </div>
                                <div className="cardProduct-body">
                                    <h5>{this.state.product.name_product}</h5>
                                    <p>Rp. {this.state.product.price_product}</p>
                                    <p>{this.state.product.description}</p>
                                </div>
                            </div>
                            </div>
                            <div className="col-7">
                                <div className="d-flex flex-row justify-content-between filter-sort ">
                                    <div className="fiter-name">
                                        <div className="input-group mb-2 mr-sm-2">
                                            <div className="input-group-prepend">
                                            <div className="input-group-text"><i class="fa fa-search" aria-hidden="true"></i></div>
                                            </div>
                                            <input type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Cari yang kamu mau"/>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                            <option selected>Pilih Kategori</option>
                                            <option value="cokelat">Cokelat</option>
                                            <option value="snack">Snack</option>
                                            <option value="minuman">Minuman</option>
                                        </select>
                                    </div>
                                    <div className="sorting">
                                    <div className="col-auto">
                                        <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                            <option selected>Urutkan</option>
                                            <option value="az">A-Z</option>
                                            <option value="za">Z-A</option>
                                        </select>
                                    </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-wrap flex-row">
                                    {this.renderItems()}
                                </div>
                               <div className="d-flex flex-row justify-content-center mt-2">
                                    <div className="page">
                                            <button
                                                disabled={this.state.page === 1}
                                                onClick={this.prevPagehandler}
                                                className="btn-page"
                                            >
                                                {'<'}
                                            </button>
                                            {" "}Page <span>{this.state.page}</span> of <span>{this.state.maxPage}</span> {" "}
                                            <button
                                                disabled={this.state.page === this.state.maxPage}
                                                onClick={this.nextPagehandler}
                                                className="btn-page"
                                            >
                                                {'>'}
                                            </button>
                                    </div>
                               </div>
                            </div>
                            <div className="col-2">
                                <div className="selectedItemList">
                                <p className="text-center">item dipilih</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        )
    }
}



export default ItemsPage;
