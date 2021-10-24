import React, { useState } from "react"

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Form } from "react-bootstrap";
import { useHistory } from "react-router";
import axios from 'axios';
import { API_URL } from '../../../constants/API';

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
const Register = () => {
    const [authregister, setauthregister] = useState(false)
    const classes = useStyles();
    const history = useHistory();
    const [input, setInput] = useState({ email: "", password: "", confirm: "" })



    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.password !== input.confirm) {
            alert("password didn't match");
        } else {

        }
        axios.post(`${API_URL}/user/register`, {
            email: input.email,
            password: input.password
        })
            .then(res => {
                alert("register success, please verify your account");
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
            case "email": {
                setInput({ ...input, email: value })
                break;
            }
            case "password": {
                setInput({ ...input, password: value })
                break;
            }
            case "confirm": {
                setInput({ ...input, confirm: value })
                break;
            }
            default: { break; }
        }
    }
    return (
        <div style={{ backgroundColor: "white", height: "100vh" }}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>

                    <div style={{ marginTop: "10%" }}>
                        <Typography component="h1" variant="h5">
                            REGISTER
                        </Typography>
                    </div>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={handleChange}
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={input.email} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handleChange}
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                value={input.password} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Konfirmasi Password</Form.Label>
                            <Form.Control type="password" placeholder="Konfirmasi Password" onChange={handleChange}
                                name="confirm"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                value={input.confirm} />
                        </Form.Group>
                        <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: "#F4CBDD", color: "white", marginBottom: "10px" }}>REGISTER</Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Sudah punya akun ? masuk
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>

            </Container>
        </div>
    );
};

export default Register;