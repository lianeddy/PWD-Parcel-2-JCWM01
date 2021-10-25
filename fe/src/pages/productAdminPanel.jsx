import React from "react";
import { Table, Button, ButtonGroup, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import AdminSidebar from "../components/adminSidebar";
import ModalAdd from "../components/addItemButton";
import Axios from "axios";

class ProductAdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dbItem: [],
      page: 1,
      maxPage: 0,
      itemPerPage: 8,
      beginningIndex: 0,

      editId: 0,
      editNameItem:"",
      editPriceItem:"",
      editIdCategory:"",
      editIdStock:"",
      editImage:"",
      editDescription:"",
    };
  }

  componentDidMount() {
    this.getData();
  };

  componentDidUpdate() {
    this.getPage();
  };

  getData = () => {
    Axios.get(`http://localhost:3300/adminitems/getitem`)
      .then((res) => {
        this.setState({
          maxPage: Math.ceil(res.data.length / this.state.itemPerPage),
        });
      })
      .catch(() => {
        alert("terjadi kesalahan deploy");
      });
  };

  getPage = () => {
    Axios.get(`http://localhost:3300/adminitems/page/${this.state.beginningIndex},${this.state.itemPerPage}`)
      .then((res) => {
        this.setState({
          dbItem: res.data,
          beginningIndex: 
            (this.state.itemPerPage * (this.state.page - 1)),
        });
      })
      .catch(() => {
        console.log("terjadi kesalahan update");
      });
  };

  editToggle = (editItem) => {
    this.setState({
      editId: editItem.id_item,
      editNameItem: editItem.name_item,
      editPriceItem: editItem.price_item,
      editIdCategory: editItem.id_category,
      editIdStock: editItem.id_stock,
      editImage: editItem.image,
      editDescription: editItem.description,
    })
  };

  cancelToggle = () => {
    this.setState({ editId: 0})
  };

  saveToggle = () => {
    Axios.patch(`http://localhost:3300/adminitems/edititem/${this.state.editId}`, {
      name_item: this.state.editNameItem,
      price_item: this.state.editPriceItem,
      id_category: this.state.editIdCategory,
      id_stock: this.state.editIdStock,
      image: this.state.editImage,
      description: this.state.editDescription,
    })
      .then((res) => {
        this.cancelToggle();
      })
      .catch(() => {
        alert("terjadi kesalahan save");
      });
  };

  deleteToggle = (deleteId) => {
    Axios.delete(`http://localhost:3300/adminitems/deletedata/${deleteId}`)
      .then(() => {
        this.getData();
      })
      .catch(() => {
        alert("terjadi kesalahan delete");
      });
  };

  inputHandler = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
    // name_item, price_item, id_category, id_stock, image, description
  };

  renderData = () => {
    return this.state.dbItem.map((val) => {
      if (val.id_item === this.state.editId) {
        return (
        <tr className="align-middle">
          <th scope="row">{val.id_item}</th>
          <th><Input value={this.state.editNameItem} onChange={this.inputHandler} type="text" className="form-control" name="editNameItem"></Input></th>
          <th><Input value={this.state.editPriceItem} onChange={this.inputHandler} type="text" className="form-control" name="editPriceItem"></Input></th>
          <th><Input value={this.state.editIdCategory} onChange={this.inputHandler} type="select" className="form-control" name="editIdCategory">
            <option value="Coklat">Coklat</option>
            <option value="Snack">Snack</option>
            <option value="Minuman">Minuman</option></Input>
          </th>
          <th><Input value={this.state.editIdStock} onChange={this.inputHandler} type="text" className="form-control" name="editIdStock"></Input></th>
          <th><Input value={this.state.editImage} onChange={this.inputHandler} type="text" className="form-control" name="editImage"></Input></th>
          <th><Input value={this.state.editDescription} onChange={this.inputHandler} type="text" className="form-control" name="editDescription"></Input></th>
          <th>
            <ButtonGroup size="sm">
              <Button onClick={this.saveToggle} color="success"> save </Button>
              <Button onClick={this.cancelToggle} color="danger"> cancel </Button>
            </ButtonGroup>
          </th>
        </tr>
        )
      }

      if (val.id_category === 1) {
        val.id_category = "Coklat";
      }
      if (val.id_category === 2) {
        val.id_category = "Snack";
      }
      if (val.id_category === 3) {
        val.id_category = "Minuman";
      }

      return (
        <tr className="align-middle">
          <th scope="row">{val.id_item}</th>
          <th>{val.name_item}</th>
          <th>{val.price_item}</th>
          <th>{val.id_category}</th>
          <th>{val.id_stock}</th>
          <th>
            <img style={{ height: "60px" }} src={val.image} alt="invalid-image" onError={(e)=>{e.target.onerror = null; e.target.src="https://www.liveo.co.id/wp-content/uploads/woocommerce-placeholder.png"}}></img>
          </th>
          <th >{val.description}</th>
          <th>
            <ButtonGroup size="sm">
              <Button onClick={() => this.editToggle(val)} outline color="secondary"> edit </Button>
              <Button onClick={() => this.deleteToggle(val.id_item)}outline color="danger"> delete </Button>
            </ButtonGroup>
          </th>
        </tr>
      );
    });
  };

  nextButton = () => {
    if (this.state.page < this.state.maxPage) {
      this.setState({ page: this.state.page + 1 }); 
    }
    
  };

  prevButton = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    }
    
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <AdminSidebar />
          </div>
          <div className="col-10">
            <div className="titled text-left p-3 jarak mt-2">
              Product Management / <strong>Item</strong>
            </div>
            <div className="jarak mt-2">
              <ModalAdd />
            </div>
            <div className="jarak text-center">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama Item</th>
                    <th>Harga</th>
                    <th>Kategori</th>
                    <th>Stok</th>
                    <th className={"w-25"}>Foto</th>
                    <th className={"w-25"}>Deskripsi</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{this.renderData()}</tbody>
              </Table>
              <div className="d-flex flex-row justify-content-around align-items-center">
                <Button onClick={this.prevButton} size="sm" color="danger"> {"<"} </Button>
                <div> Page {this.state.page} of {this.state.maxPage} </div>
                <Button onClick={this.nextButton} size="sm" color="danger"> {">"} </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default ProductAdminPanel;
