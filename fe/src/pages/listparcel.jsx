import axios from 'axios';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { API_URL } from '../constants/API';

const listparcel = () => {
    const handleDetail = (idp) => {
        if (idp === 1) {
            axios.post(`${API_URL}/products/profit`, {
                id: idp,
                iditems1: 1,
                idItems2: 2,
            })
                .then(res => {
                    alert(res.data);
                })
                .catch(err => {
                    alert('gagal');
                })
        } else if (idp === 2) {
            axios.post(`${API_URL}/products/profit`, {
                id: idp,
                iditems1: 1,
                idItems2: 1,
            })
                .then(res => {
                    alert(res.data);
                })
                .catch(err => {
                    alert('gagal');
                })
        } else {
            axios.post(`${API_URL}/products/profit`, {
                id: idp,
                iditems1: 2,
                idItems2: 2,
            })
                .then(res => {
                    alert(res.data);
                })
                .catch(err => {
                    alert('gagal');
                })
        }
    }
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>items 1</th>
                        <th>items 2</th>
                        <th>aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>2</td>
                        <td><Button variant="primary" onClick={() => handleDetail(1)}>profit</Button></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>1</td>
                        <td>1</td>
                        <td><Button variant="primary" onClick={() => handleDetail(2)}>profit</Button></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>2</td>
                        <td>2</td>
                        <td><Button variant="primary" onClick={() => handleDetail(3)}>profit</Button></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default listparcel;