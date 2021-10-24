import React, {useState, useEffect} from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import Axios from "axios";

const ModalAdd = (props) => {
  const [value, setValue] = useState({
    name_item: '',
    name_category: '',
    amount: '',
    description: '',
    image: ''
  });

  const inputHandler = (event) => {
    setValue({...value,[event.target.name]: event.target.value
  })}
 
  const addHandler = async (e) => {
    e.preventDefault()
   await Axios.post("http://localhost:2000/items", value);
  }
  

  const { buttonLabel, className } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
  return (
    <div>
      <Button outline color="success" size="sm" onClick={toggle}>
        Add Item
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} close={closeBtn}>Add Item</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Nama Item</Label>
              <Input
                type="text"
                name="addName_item"
                placeholder="Nama Item"
                onChange={inputHandler}
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <Label>Kategori</Label>
              <Input
                type="text"
                name="addName_category"
                placeholder="Jenis Kategori"
                onChange={inputHandler}
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <Label>Harga</Label>
              <Input
                type="text"
                name="addAmount"
                placeholder="7000"
                onChange={inputHandler}
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <Label>Deskripsi</Label>
              <Input type="textarea" name="addDescription" placeholder="Maksimal 50 karakter" onChange={inputHandler}/>
            </FormGroup>
            <FormGroup className="mt-2">
              <Label>Foto</Label>{" "}
              <Input type="text" name="addImage" onChange={inputHandler}/>
              <div></div>
              <FormText color="muted">
                Format foto yang didukung jpg,jpeg,png dan jfif. Ukuran foto maksimal 720x720px
              </FormText>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button outline color="success" size="sm" onClick={toggle, addHandler}>
            Save Item
          </Button>{" "}
          <Button outline color="danger" size="sm" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};


export default ModalAdd;
