import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./register.scss";
import { useForm } from "react-hook-form";
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import { wait } from '@testing-library/user-event/dist/utils';
import axios from "axios";

const Register = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

    const onSubmit = async (e) => {
        if (e.preventDefault) e.preventDefault();

        const erroruser = document.querySelector(".error-pseudo");
        const erroremail = document.querySelector(".error-email");
        const errorpassword = document.querySelector(".error-password");
        const errorconfirmpassword = document.querySelector(".error-confirmpassword");
        errorconfirmpassword.innerHTML = "";
        setFormSubmitted(false);
        if (password !== confirmPassword) {
            console.log("passwords do not match");
            errorconfirmpassword.innerHTML = "passwords do not match";
        }
        else {
            //faire une requete axios pour verifier si le pseudo et le password sont corrects
            setIsSubmitting(true);
            await axios({
                method: "post", //methode de la requete
                // url: `${process.env.REACT_APP_MY_API_URL}api/user/register`,//url de la requete
                url: `${process.env.REACT_APP_API_URL}api/user/register`,//url de la requete
                data: { //les donnees a envoyer
                    pseudo, //pseudo: pseudo
                    email, //email: email
                    password, //password: password
                }
            }).then((res) => {  //res = reponse du serveur
                if (res.data.errors) { //si il y a des erreurs
                    erroruser.innerHTML = res.data.errors.pseudo; //afficher le message d'erreur (a changer) 
                    erroremail.innerHTML = res.data.errors.email;
                    errorpassword.innerHTML = res.data.errors.password; //afficher le message d'erreur (a changer)
                } else { //si il n'y a pas d'erreurs
                    //window.location = "/login"; //rediriger vers la page d'accueil
                    setFormSubmitted(true);
                }
            }).catch((err) => { //si il y a une erreur
                console.log(err); //afficher l'erreur dans la console
            });
            setIsSubmitting(false);
        }
    }
    return (
        <div className="register">
            <div className="card">

                <div className="left">
                    <h1>ChitChat.</h1>
                    <p>Connect with friends and the world around you on ChitChat.</p>
                    <span>Do you have an account?</span>
                    <Link to="/login"><button>Login</button></Link>
                </div>

                <div className="right">
                    <h1>Register</h1>
                    {formSubmitted && <span className="success">Registration successful, please login!</span>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder="pseudo"
                            id="name"
                            aria-invalid={errors.name ? "true" : "false"}
                            {...register('name', { required: true, maxLength: 20 })}
                            onChange={(e) => setPseudo(e.target.value)}
                        />
                        <span className="error-pseudo"> </span>

                        <input type="email" placeholder="Email"
                            id="email"
                            {...register("email", { required: true })}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="error-email"> </span>

                        <input type="password" placeholder="Password"
                            id="password"
                            {...register("password", { required: true })}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="error-password"></span>

                        <input type="password" placeholder="confirm password"
                            id="confirmPassword"
                            {...register("confirmPassword", { required: true })}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span className="error-confirmpassword"> </span>
                        <button type='submit' disabled={isSubmitting}>Register</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Register;
