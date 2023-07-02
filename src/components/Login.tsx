// import Head from "next/head";
import React, { useState } from "react";
// import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const { login, user, signout } = useAuth();

  const [userData, setUserData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit() {
    setErrorMessage("");
    try {
      await login(userData.email, userData.password);
      navigate(-1);
      // ANY ?!?!
    } catch (error: any) {
      if (error.code === "auth/invalid-email") {
        setErrorMessage("You have enetered an invalid email");
      }
      if (error.code === "auth/user-not-found") {
        setErrorMessage("User not found");
      }
      if (error.code === "auth/wrong-password") {
        setErrorMessage("Wrong Password");
      }
    }
  }

  if (user) {
    return (
      <div>
        <h1>You are already logged in as {user.email}</h1>
        <button onClick={signout}>Logout</button>
      </div>
    );
  }
  return (
    <div className="pt-16 pb-32">
      <h1 className="text-3xl text-center text-primary-200 font-semibold ">
        Login
      </h1>
      <div className="flex flex-col px-10 space-y-12 pt-16">
        {errorMessage && (
          <h1 className="text-danger-500 text-center">{errorMessage}</h1>
        )}
        <div className="flex flex-col">
          {/* <label className="text-neutral-200 " htmlFor="email">
            Email
          </label> */}
          <input
            className="border-b border-neutral-500 rounded-sm p-2 focus:border-primary-600"
            id="email"
            name="email"
            // type="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          {/* <label className="text-neutral-200 " htmlFor="password">
            Password
          </label> */}
          <input
            className="border-b border-neutral-500 rounded-sm p-2 focus:border-primary-600"
            // type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <div className="pt-12">
            <Button text="Login" onClick={handleSubmit} />
          </div>
          <div className="flex justify-center space-x-2 text-center pt-2 text-neutral-400 ">
            <p>Not a client yet?</p>
            <Link to="/register">
              <span className="text-secondary-600 hover-hover:hover:text-secondary-500 font-semibold cursor-pointer transition-all">
                Sign Up!
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
