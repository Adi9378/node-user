import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Account = () => {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("ltok") && localStorage.getItem("userId")) {
      console.log(
        "vvv",
        localStorage.getItem("ltok"),
        localStorage.getItem("userId")
      );
      axios
        .get(
          `http://localhost:3333/api/user/${localStorage.getItem("userId")}`,
          {
            headers: { authorization: localStorage.getItem("ltok") },
          }
        )
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err.response);
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
      <div>Connecté</div>
    </>
  );
};

export default Account;
