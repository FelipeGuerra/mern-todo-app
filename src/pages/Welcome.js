import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CredentialsContext } from "../App";
import Todos from "../components/Todos"

export default function Welcome() {
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const logout = () => {
    setCredentials(null);
  };

  return (
    <div>
      <header className="main-header">
        <h1>{credentials && credentials.username}'s TODO List</h1>
        {credentials && <button className="logout" onClick={logout}>Logout</button>}
      </header>

      <main className="page-content page-content--welcome">
        {!credentials && <Link to="/register">Register</Link>}
        {!credentials && <Link to="/login">Login</Link>}
        {credentials && <Todos />}
      </main>
    </div>
  )
}