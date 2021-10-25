import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import '../assets/styles/navbarku.css'
import logo from '../assets/images/Vector.png'
import foto from '../assets/images/image.png'
import cart from '../assets/images/cart.png'
import { Button, Nav } from 'react-bootstrap';
import { Menu, MenuItem } from '@material-ui/core';
import jwt_decode from 'jwt-decode';

function Navbarku() {

    let token;
    let decoded;
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        decoded = jwt_decode(token);
        console.log(decoded);
    }

    const cartProduct = useSelector(state => state.cartProduct.productList);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    const handleProfile = () => {
        window.location.href = "/profile"
    }

    const handlePassword = () => {
        window.location.href = "/resetpassword"
    }

    const handleAdmin = () => {
        window.location.href = "/Productadmin"
    }


    return (
        <div className="navbar" >
            <navbar className="container-fluid">
                <Link to="/">
                    <div className="brand">
                        <img src={logo} alt="logo" />
                        <p>parselio</p>
                    </div>
                </Link>
                <div className="nav-right">


                    {token ?
                        decoded.isadmin === 1 ?
                            <Nav>
                                <Link to="/cart-product">
                                    <img style={{ marginTop: "10px" }} className="cart" src={cart} alt="cart" />
                                    <span style={{ marginTop: "10px" }} class="badge badge-pill badge-primary">{cartProduct.length}</span>
                                </Link>
                                <img onClick={handleClick} style={{ marginTop: "6px", cursor: "pointer" }} className="foto" src={foto} alt="foto" />
                                {/* <Nav.Link onClick={handleCart} style={{ color: "#ff725e", marginTop: "5px" }}><ShoppingCartIcon /></Nav.Link> */}
                                <Nav.Link onClick={handleAdmin} style={{}}>
                                    <Button style={{ border: "1px solid #ff725e", backgroundColor: "white", color: "#ff725e", fontWeight: "500" }}>ADMIN</Button>
                                </Nav.Link>
                            </Nav>
                            :
                            <Nav>
                                <Link to="/cart-product">
                                    <img style={{ marginTop: "10px" }} className="cart" src={cart} alt="cart" />
                                    <span style={{ marginTop: "10px" }} class="badge badge-pill badge-primary">{cartProduct.length}</span>
                                </Link>
                                <img onClick={handleClick} style={{ marginTop: "6px", cursor: "pointer" }} className="foto" src={foto} alt="foto" />
                            </Nav>
                        :
                        <Nav>
                            <Nav.Link href="/login" style={{}}>
                                <Button style={{ border: "1px solid #ff725e", backgroundColor: "white", color: "#ff725e", fontWeight: "500" }}>LOGIN</Button>
                            </Nav.Link>
                            <Nav.Link eventKey={2} href="/register">
                                <Button style={{ border: "1px solid #ff725e", backgroundColor: "white", color: "#ff725e", fontWeight: "500" }}>BUAT AKUN</Button>
                            </Nav.Link>
                        </Nav>}

                </div>
            </navbar>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleProfile}>Edit Profile</MenuItem>
                <MenuItem onClick={handlePassword}>Edit Password</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>

        </div>
    )
}

export default Navbarku
