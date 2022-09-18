import React from 'react';
import "./../App.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.png"
function Nav() {

    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/signup");
    };

    return (
        <>

            <div className='nav-header'>

                {
                    auth ?
                        <>

                            <img src={logo} alt={'profil'} className={'logo'} />
                            <ul className={'nav-ul'}>
                                <li>
                                    <Link to={"/"}>Product</Link>
                                </li>
                                <li>
                                    <Link to={"/add-product"}>Add Product</Link>
                                </li>
                                <li>
                                    <Link to={"/profile"}>Profile</Link>
                                </li>
                                <li>
                                    <Link to={"/login"} onClick={logout}>Logout ({JSON.parse(auth).name})</Link>
                                </li>
                            </ul>
                        </>
                        :
                        <ul className='nav-ul'>
                            <>
                                <li><Link to={"/signup"}>Sign Up</Link></li>
                                <li><Link to={"/login"}>Login </Link></li>
                            </>
                        </ul>

                }
            </div>
        </>
    )
}

export default Nav;

