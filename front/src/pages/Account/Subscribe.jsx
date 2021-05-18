import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Subscribe = () => {
  const initialState = {
    email: "",
    username: "",
    password: "",
    checkPassword: "",
  };

  const [dataSubscribe, setDataSubscribe] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initialState);
    await axios
      .post("http://localhost:3333/api/user/register", dataSubscribe)
      .then((res) => console.log(res))
      .catch((err) => {
        if (err.response.status === 412) {
          setErrors({
            ...initialState,
            ...err.response.data,
          });
        }
        if (err.response.status === 409) {
          setErrors({
            ...initialState,
            [err.response.data.problem]: err.response.data.message,
          });
        }
      });
  };

  const handleChange = ({ target }) => {
    setDataSubscribe({
      ...dataSubscribe,
      [target.name]: target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input onChange={handleChange} type="text" name="email" />
          <div>{errors.email}</div>
        </div>
        <div>
          <label>Username</label>
          <input onChange={handleChange} type="text" name="username" />
          <div>{errors.username}</div>
        </div>
        <div>
          <label>Mot de passe</label>
          <input onChange={handleChange} type="text" name="password" />
          <div>{errors.password}</div>
        </div>
        <div>
          <label>Tapez votre mot de passe à nouveau</label>
          <input onChange={handleChange} type="text" name="checkPassword" />
          <div>{errors.checkPassword}</div>
        </div>
        <div>
          <input type="submit" value="subscribe" />
        </div>
      </form>
      <Link to="/login">Vous avez un compte ? Connectez vous</Link>
    </div>
  );
};

export default Subscribe;
