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

        console.log(process.env.REACT_APP_MY_API_URL);

        //faire une requete axios pour verifier si le pseudo et le password sont corrects
        axios({
            method: "post", //methode de la requete
            // url: `${process.env.REACT_APP_MY_API_URL}api/user/login`,//url de la requete
            url: `http://localhost:5000/api/user/login`,//url de la requete
            data: { //les donnees a envoyer
                pseudo, //pseudo: pseudo
                password //password: password
            }
        }).then((res) => {  //res = reponse du serveur

            if (res.data.errors) { //si il y a des erreurs
                erroruser.innerHTML = res.data.errors.pseudo; //afficher le message d'erreur (a changer) 
                errorpassword.innerHTML = res.data.errors.password; //afficher le message d'erreur (a changer)
            } else { //si il n'y a pas d'erreurs
                // window.location = "/"; //rediriger vers la page d'accueil
                console.log(res.data);
            }
        }).catch((err) => { //si il y a une erreur
            console.log(err); //afficher l'erreur dans la console
        });
    }

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
