import axios from "axios";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [dataLogin, setDataLogin] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(initialState);
    axios
      .post("http://localhost:3333/api/user/login", dataLogin)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("ltok", res.data.token);
        localStorage.setItem("userId", res.data.user);
        setRedirect(true);
      })
      .catch((err) => {
        if (err.response.status === 412) {
          setErrors({
            ...initialState,
            ...err.response.data,
          });
        }
        if (err.response.status === 401) {
          setErrors({
            ...initialState,
            password: "les identifiants ne correspondent pas",
          });
        }
      });
  };

  const handleChange = ({ target }) => {
    setDataLogin({
      ...dataLogin,
      [target.name]: target.value,
    });
  };

  return (
    <>
      {redirect && <Redirect to="/account" />}

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input onChange={handleChange} type="text" name="email" />
            <div>{errors.email}</div>
          </div>
          <div>
            <label>Mot de passe</label>
            <input onChange={handleChange} type="text" name="password" />
            <div>{errors.password}</div>
          </div>
          <div>
            <button type="submit">Connect</button>
          </div>
        </form>
        <Link to="/subscribe">Pas de compte ? Inscrivez vous</Link>
      </div>
    </>
  );
};

export default Login;
