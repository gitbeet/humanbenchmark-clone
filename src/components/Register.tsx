import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "./Button";

import { useAppDispatch, useAppSelector } from "../utilities/hooks";
import { register, reset, logout } from "../features/auth/userSlice";
import InputField from "./InputField";

export default function Register() {
  const initialValues = {
    email: "",
    username: "",
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
    username: "",
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
    console.log(userData);
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
        username: userData.username,
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
    <div className=" p-12 container-menu mt-8">
      <div className="space-y-4">
        <h1 className="text-5xl text-center text-primary-200 font-semibold ">
          Sign up
        </h1>
        <div className="flex justify-center space-x-2 text-center text-lg ">
          <p>Already have an account?</p>
          <Link to="/login">
            <span className="text-secondary-500 font-semibold cursor-pointer text-light-blue">
              Log in
            </span>
          </Link>
        </div>
      </div>
      {message && <h1 className=" text-center">{message}</h1>}

      <div className="flex flex-col px-10 space-y-2 pt-12 w-[min(550px,90%)] mx-auto">
        <InputField
          label="Email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <InputField
          label="Username"
          id="username"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <InputField
          label="Password confirmation"
          id="confirmPassword"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
        />
        <div className="pt-4">
          <Button text="Sign up" onClick={handleSubmit} width="full" />
        </div>
      </div>
    </div>
  );
}
