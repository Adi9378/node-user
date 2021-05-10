import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [dataLogin, setDataLogin] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3333/api/user", dataLogin)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleChange = ({ target }) => {
    setDataLogin({
      ...dataLogin,
      [target.name]: target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input onChange={handleChange} type="text" name="email" />
        </div>
        <div>
          <label>Mot de passe</label>
          <input onChange={handleChange} type="text" name="password" />
        </div>
        <div>
          <button type="submit">Connect</button>
        </div>
      </form>
      <Link to="/subscribe">Pas de compte ? Inscrivez vous</Link>
    </div>
  );
};

export default Login;
