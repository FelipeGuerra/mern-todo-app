import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { CredentialsContext } from "../App";

export const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response;
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const login = (e) => {
    e.preventDefault();

    fetch('http://localhost:4000/login', {
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
      <h1>Login</h1>
      <Link to="/">Welcome</Link>
      <br />
      {error && <span className="error">{error}</span>}
      <form onSubmit={login}>
        <input type="text" placeholder="username" required
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input type="password" placeholder="password" required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}