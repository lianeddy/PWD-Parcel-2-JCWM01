import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const kasi = (props) => {
    console.log(props.match.params.token);
    const decoded = jwt_decode(props.match.params.token);
    axios.put('http://localhost:8080/user/ed', {
        email: decoded.email
    })
        .then(res => {
            console.log("kasi berhasil");
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

export default kasi;