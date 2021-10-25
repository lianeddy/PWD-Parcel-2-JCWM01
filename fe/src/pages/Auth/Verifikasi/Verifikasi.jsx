import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { API_URL } from '../../../constants/API';

const Verifikasi = (props) => {
    console.log(props.match.params.token);
    const decoded = jwt_decode(props.match.params.token);
    axios.put(`${API_URL}/user/verified`, {
        email: decoded.email
    })
        .then(res => {
            console.log("verifikasi berhasil");
            window.location.href = "/login";
        })
        .catch(err => {
            alert('gagal');
        })
    return (
        <div>

        </div>
    );
};

export default Verifikasi;