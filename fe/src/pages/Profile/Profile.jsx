import { Grid, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_URL } from '../../constants/API';
import jwt_decode from 'jwt-decode';


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Profile = () => {
    const classes = useStyles();
    const [input, setInput] = useState({ email: "", fullname: "", address: "", gender: 0, age: "", image: "" });
    const [img, setimg] = useState(null);
    let decoded;
    let user;
    const token = localStorage.getItem("token");
    useEffect(() => {
        decoded = jwt_decode(token);
        console.log(decoded.email);
        axios.post(`${API_URL}/user/getUser`, {
            email: decoded.email,
        })
            .then(res => {
                user = res.data[0];
                setInput({
                    email: user.email,
                    fullname: user.fullname,
                    address: user.address,
                    gender: user.gender,
                    age: user.age,
                    image: user.images.substr(19, user.images.length - 1)
                })
                console.log(user.images)
            })
            .catch(err => {
                alert(err);
            })

    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(decoded);
        console.log(img);
        const formData = new FormData()
        if (img) {
            console.log("masuk sini");
            formData.append("image", img);
            formData.append("email", input.email);
            formData.append("fullname", input.fullname);
            formData.append("address", input.address);
            formData.append("gender", input.gender);
            formData.append("age", input.age);
            axios.put(`${API_URL}/user/updateprofileimage`, formData)
                .then(res => {
                    console.log(res);
                    alert("update profile success");
                    // window.location.href = "/";
                    window.location.reload();
                })
                .catch(err => {
                    alert('update profile gagal');
                })
        } else {
            axios.put(`${API_URL}/user/updateprofile`, {
                email: input.email,
                fullname: input.fullname,
                address: input.address,
                gender: input.gender,
                age: input.age
            })
                .then(res => {
                    console.log(res);
                    alert("update profile success");
                    // window.location.href = "/";
                    window.location.reload();
                })
                .catch(err => {
                    alert('update profile gagal');
                })
        }
    }

    const handleChange = (event) => {
        let value = event.target.value
        let name = event.target.name
        switch (name) {
            case "fullname": {
                setInput({ ...input, fullname: value })
                break;
            }
            case "address": {
                setInput({ ...input, address: value })
                break;
            }
            case "gender": {
                setInput({ ...input, gender: value })
                break;
            }
            case "age": {
                setInput({ ...input, age: value })
                break;
            }
            case "image": {
                setimg(event.target.files[0]);
                break;
            }
            default: { break; }
        }
        console.log(input);
    }
    return (
        <div>
            <div style={{ height: "500px", marginInline: "10%" }}>
                {/* <Hidden smDown> */}
                <Grid container spacing={3}>
                    <Grid item xs={3} style={{ backgroundRepeat: "no-repeat", backgroundAttachment: "scroll", height: "600px", marginTop: "10%" }}>
                        {input.image === "" ?
                            <Image src={"./images/default.jpg"} thumbnail />
                            :
                            <Image src={"./images/" + input.image} thumbnail />
                        }

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control name="image" onChange={handleChange} type="file" />
                        </Form.Group>
                    </Grid>
                    <Grid item xs={9} style={{ marginTop: "80px" }}>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicfullname">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" placeholder="Full Name" onChange={handleChange}
                                    name="fullname"
                                    autoComplete="fullname"
                                    autoFocus
                                    value={input.fullname} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Address" onChange={handleChange}
                                    name="address"
                                    label="address"
                                    value={input.address} />
                            </Form.Group>
                            <Form.Group controlId="formGridState">
                                <Form.Label>Gender : </Form.Label>
                                <select name="gender" value={input.gender} onChange={handleChange} style={{ marginLeft: "20px" }} className="me-sm-2" id="inlineFormCustomSelect">
                                    <option value={0}>Male</option>
                                    <option value={1}>Female</option>
                                </select>
                            </Form.Group>
                            <Form.Group controlId="formGridState">
                                <Form.Label>Age : </Form.Label>
                                <Form.Control type="number" placeholder="Age" onChange={handleChange}
                                    name="age"
                                    label="age"
                                    value={input.age} />
                            </Form.Group>
                            <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: "#F4CBDD", color: "white", marginBottom: "10px", marginRight: "20px" }}>UPDATE</Button>
                            <a href={`./resetpassword`} variant="body2">
                                {"change  password ?"}
                            </a>
                        </form>
                    </Grid>
                </Grid>
            </div>
        </div >
    );
};

export default Profile;