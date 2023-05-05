import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./login.scss";
import axios from "axios";

const Login = () => {

    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const erroruser = document.querySelector(".error-pseudo");
        const errorpassword = document.querySelector(".error-password");

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: {
                pseudo,
                password,
            },
        })
            .then((res) => {
                console.log(res);
                if (res.data.errors) {
                    erroruser.innerHTML = res.data.errors.pseudo;
                    errorpassword.innerHTML = res.data.errors.password;
                } else {
                    window.location = "/";
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>ChitChat.</h1>
                    <p>Connect with friends and the world around you on ChitChat.</p>
                    <span>New to ChitChat?</span>
                    <Link to="/register"><button>Register</button></Link>
                </div>

                <div className="right">
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <input type="text" placeholder="pseudo"
                            onChange={(e) => setPseudo(e.target.value)} />
                        <span className="error-pseudo"></span>

                        <input type="password" placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)} />
                        <span className="error-password"></span>

                        <button type="submit">Login</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Login;
