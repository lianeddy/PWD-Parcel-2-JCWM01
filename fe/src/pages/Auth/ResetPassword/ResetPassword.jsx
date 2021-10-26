import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../../../constants/API';
import jwt_decode from 'jwt-decode';


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#92E3A9",
        color: "white"
    },
}));

const ResetPassword = (props) => {
    console.log(props.match.params.token);


    const [authlogin, setauthlogin] = useState(false);
    const classes = useStyles();
    const [input, setInput] = useState({ email: "", password: "" });

    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();

        const decoded = jwt_decode(props.match.params.token);
        axios.put(`${API_URL}/user/reset`, {
            email: decoded.email,
            password: input.password
        })
            .then(res => {
                alert("reset password berhasil");
                window.location.href = "/login";
            })
            .catch(err => {
                alert('gagal');
            })
    }

    const handleChange = (event) => {
        let value = event.target.value
        let name = event.target.name
        switch (name) {
            case "password": {
                setInput({ ...input, password: value })
                break;
            }
            default: { break; }
        }
    }
    const handleClose = () => {
        setauthlogin(false);
        window.location.reload();
    }
    return (
        <div style={{ backgroundColor: "white", height: "100vh" }}>
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div className={classes.paper}>
                    <div style={{ marginTop: "10%" }}>
                        <Typography component="h1" variant="h5">
                            RESET PASSWORD
                        </Typography>
                    </div>

                    <Form className={classes.form} onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handleChange}
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                value={input.password} />
                        </Form.Group>
                        <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: "#F4CBDD", color: "white", marginBottom: "10px" }}>RESET</Button>
                    </Form>
                </div>
            </Container >
        </div>
    );
};

export default ResetPassword;