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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#92E3A9",
        color: "white"
    },
}));

const Login = () => {
    const [authlogin, setauthlogin] = useState(false);
    const classes = useStyles();
    const [input, setInput] = useState({ email: "", password: "" });

    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault()

        axios.post(`${API_URL}/user/login`, {
            email: input.email,
            password: input.password
        })
            .then(res => {
                if (res.data === "notfound") {
                    alert("email not found");
                } else {
                    if (res.data === "notactive") {
                        alert("you must activate your account");
                    } else {
                        if (res.data === "notmatch") {
                            alert("password wrong");
                        } else {
                            const { token } = res.data;
                            localStorage.setItem("token", token);
                            // Decode token to get user data
                            const decoded = jwt_decode(token);
                            localStorage.setItem("email", decoded.email);
                            history.push("/");
                            if (res.data.length === 0) {
                                alert("username atau password anda salah");
                                window.location.reload();
                            } else {
                                window.location.href = "/";
                            }
                        }
                    }
                }

            })
            .catch(err => {
                alert(err);
            })


        // console.log(input);
        // if (input.email === 'dwi@gmail.com' && input.password === '123') {
        //     localStorage.setItem("15emailcek", input.email);
        // } else {
        //     setauthlogin(true);
        // }
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
            default: { break; }
        }
    }
    const handleClose = () => {
        setauthlogin(false);
        window.location.reload();
    }
    const handleReset = () => {
        axios.post(`${API_URL}/user/sharereset`, {
            email: input.email
        })
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                alert(err);
            })
    }
    return (
        <div style={{ backgroundColor: "white", height: "100vh" }}>
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div className={classes.paper}>
                    <div style={{ marginTop: "10%" }}>
                        <Typography component="h1" variant="h5">
                            LOGIN
                        </Typography>
                    </div>

                    <Form className={classes.form} onSubmit={handleSubmit}>
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: "#F4CBDD", color: "white", marginBottom: "10px" }}>LOGIN</Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="./email" variant="body2">
                                    {"lupa password"}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="./register" variant="body2">
                                    {"Belum punya akun? Register"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Form>
                </div>
            </Container >
        </div>
    );
};

export default Login;