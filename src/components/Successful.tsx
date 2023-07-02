import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Successful(): JSX.Element {
  const { user } = useAuth();

  return (
    <div>
      <h1>You have successfuly registered as {user && user.email}</h1>
      <Link to="/">
        <button>Go HOME</button>
      </Link>
    </div>
  );
}
