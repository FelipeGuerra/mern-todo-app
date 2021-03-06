import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { CredentialsContext } from "../App";

import { handleErrors } from './Login';

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const register = (e) => {
    e.preventDefault();

    fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username, password
      })
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({
          username,
          password
        });
        history.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  const history = useHistory();

  return (
    <div>
      <h1>Register</h1>
      <Link to="/">Welcome</Link>
      <br />
      {error && <span className="error">{error}</span>}
      <form onSubmit={register}>
        <input type="text" placeholder="username" required
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input type="password" placeholder="password" required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}