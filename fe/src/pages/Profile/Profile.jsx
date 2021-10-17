import { Grid, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
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
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Profile = () => {
    const classes = useStyles();
    const [input, setInput] = useState({ fullname: "", address: "", gender: 0, age: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        console.log(decoded);
        axios.put(`${API_URL}/user/updateprofile`, {
            email: decoded.email,
            fullname: input.fullname,
            address: input.address,
            gender: input.gender,
            age: input.age
        })
            .then(res => {
                alert("update profile success");
                window.location.href = "/";
            })
            .catch(err => {
                alert('update profile gagal');
            })
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
            default: { break; }
        }
        console.log(input);
    }
    return (
        <div>
            <div style={{ height: "500px", marginInline: "10%" }}>
                <Hidden smDown>
                    <Grid container spacing={3}>
                        <Grid item xs={3} style={{ backgroundImage: `url('./images/default.jpeg')`, backgroundRepeat: "no-repeat", backgroundAttachment: "scroll", height: "600px", marginTop: "-30px" }}>
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
                                <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: "#F4CBDD", color: "white", marginBottom: "10px" }}>UPDATE</Button>
                            </form>
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden mdUp>
                    <div style={{ marginLeft: "10px", marginTop: "40px" }}>
                    </div>
                </Hidden>


            </div>
        </div >
    );
};

export default Profile; 
