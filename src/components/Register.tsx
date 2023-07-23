import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "./Button";

import { useAppDispatch, useAppSelector } from "../utilities/hooks";
import { register, reset, logout } from "../features/auth/userSlice";

export default function Register() {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { user, isError, isLoading, isSuccess, message } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(reset);
    const { name, value } = e.target;
    setErrorMessage((prev) => {
      return { ...prev, [name]: "" };
    });
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  useEffect(() => {
    dispatch(reset);
  }, []);

  useEffect(() => {
    if (isSuccess && user) navigate("/successful");
  }, [isSuccess, user]);

  function handleSubmit() {
    dispatch(reset);
    dispatch(
      register({
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      })
    );
  }

  useEffect(() => {}, [isSuccess]);

  if (user) {
    return (
      <div>
        <h1>You are already logged in as {user.email}</h1>
        <button onClick={() => dispatch(logout)}>Logout</button>
      </div>
    );
  }

  return (
    <div className="pt-12">
      <h1 className="text-2xl text-center text-primary-200 font-semibold ">
        Register
      </h1>
      <h1>{message}</h1>
      <div className="flex flex-col px-10 space-y-12 pt-12">
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
          <h1
            className={
              errorMessage.email ? "text-danger-500 text-right" : "opacity-0"
            }
          >
            {errorMessage.email}
          </h1>
        </div>
        <div className="flex flex-col">
          {/* <label className="text-neutral-200 " htmlFor="password">
            Password
          </label> */}
          <input
            className={
              errorMessage.password
                ? "border-b rounded-sm p-2 text-danger-500 border-danger-500 focus:border-danger-600 placeholder:text-danger-500"
                : "border-b border-neutral-500 rounded-sm p-2 focus:border-primary-600"
            }
            // type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <h1
            className={
              errorMessage.password ? "text-danger-500 text-right" : "opacity-0"
            }
          >
            {errorMessage.password}
          </h1>
        </div>
        <div className="flex flex-col">
          {/* <label className="text-neutral-200 " htmlFor="password">
            Password
          </label> */}
          <input
            className="border-b border-neutral-500 rounded-sm p-2 focus:border-primary-600"
            // type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleChange}
          />
          <h1
            className={
              errorMessage.confirmPassword
                ? "text-danger-500 text-right"
                : "opacity-0"
            }
          >
            {errorMessage.confirmPassword}
          </h1>
        </div>
        <div className="pt-12">
          <Button text="Register" onClick={handleSubmit} />
          <Button text="Reset" onClick={() => dispatch(reset)} />
        </div>
        <div className="flex justify-center space-x-2 text-center pt-2 ">
          <p>Already a client?</p>
          <Link to="/login">
            <span className="text-secondary-500 font-semibold cursor-pointer">
              Log In!
            </span>
          </Link>
        </div>
        h1
      </div>
    </div>
  );
}
