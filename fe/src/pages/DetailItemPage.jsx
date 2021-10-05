import React, { Component } from 'react'
import axios from 'axios';
import {API_URL} from '../constants/API'
import '../assets/styles/detail.css'

class DetailItemPage extends Component {
    state = {
        item: {},
        itemIdNotFound: false,
        qty: 1,
    }

    fetchItem = () => {
        axios.get(`${API_URL}/items/get`, {
            params: {
                id: this.props.match.params.id
            }
        }).then((res) => {
            if (res.data.length) {
                console.log(res.data);
                this.setState({item: res.data[0]})
            } else {
                this.setState({itemIdNotFound: true});
            }
        }).catch((err) => {
            console.log(`ERROR Fecth Item : ${err}`);
        })
    }

    changeQty = (e) => {
        this.setState({qty:e.target.value})
        console.log(this.state.qty);
    }

    componentDidMount(){
        this.fetchItem();
    }

    render() {
        return (
            <div className="container">
        {this.state.itemIdNotFound ? (
          <div className="alert alert-warning mt-3 ">
            Product with ID {this.props.match.params.id} has not been
            found
          </div>
        ) : (
          <div className="row mt-5">
            <div className="col-6 card-item">
              <img
                src={this.state.item.image}
                alt="Product"
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-6 d-flex flex-column justify-content-center">
              <h4>{this.state.item.name_item}</h4>
              <h5>Rp. {this.state.item.price_item}</h5>
              <p>{this.state.item.description}</p>
              <p><i class="fas fa-tags"></i> {this.state.item.name_category}</p>
              <div className="d-flex flex-row align-items-center">
                  <h5 className="mr-2">Qty</h5>
                  <input type="number" name="qty" id="qty" defaultValue={this.state.qty} onChange={(e) => this.changeQty(e)}/>
              </div>
              <button
                className="btn-addto"
              >
                Tambahkan ke keranjang
              </button>
            </div>
          </div>
        )}
      </div>
        )
    }
}

export default DetailItemPage;
