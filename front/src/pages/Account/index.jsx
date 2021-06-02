import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Account = () => {
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({});

  const handleDisconnect = () => {
    localStorage.removeItem("ltok");
    localStorage.removeItem("userId");
    setRedirect(true);
  };

  useEffect(() => {
    if (localStorage.getItem("ltok") && localStorage.getItem("userId")) {
      axios
        .get(
          `http://localhost:3333/api/user/${localStorage.getItem("userId")}`,
          {
            headers: { authorization: localStorage.getItem("ltok") },
          }
        )
        .then((res) => setUser(res.data))
        .catch((err) => {
          localStorage.removeItem("ltok");
          localStorage.removeItem("userId");
          setRedirect(true);
        });
    } else {
      setRedirect(true);
    }
  }, []);

  return (
    <>
      {redirect && <Redirect to="/login" />}
      <div>Hello {user.username}</div>
      <button onClick={handleDisconnect}>Se déconnecter</button>
    </>
  );
};

export default Account;
