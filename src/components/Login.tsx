import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utilities/hooks";
import { login, reset, logout } from "../features/auth/userSlice";
import InputField from "./InputField";

const Login = (): JSX.Element => {
  const { isError, isLoading, isSuccess, message, user } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );

  useEffect(() => {
    dispatch(reset);
  }, []);

  useEffect(() => {
    if (isSuccess && user) navigate(-1);
  }, [isSuccess, user]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit() {
    dispatch(reset);
    dispatch(login(userData));
  }

  if (user !== null) {
    return (
      <div>
        <h1>You are already logged in as {user.email}</h1>
        <button onClick={() => dispatch(logout)}>Logout</button>
      </div>
    );
  }
  return (
    <div className="p-12 container-menu">
      <div className="space-y-4">
        <h1 className="text-5xl text-center text-primary-200 font-semibold ">
          Log in
        </h1>
        <div className="flex justify-center space-x-2 text-center text-lg ">
          <p>Need an account?</p>
          <Link to="/register">
            <span className="text-secondary-500 font-semibold cursor-pointer text-light-blue">
              Sign up
            </span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col px-10 space-y-2 pt-12 w-[min(550px,90%)] mx-auto">
        {message && <h1 className=" text-center">{message}</h1>}
        <InputField
          id="email"
          label="Email"
          name="email"
          onChange={handleChange}
          value={userData.email}
          type="email"
        />
        <InputField
          id="password"
          label="Password"
          name="password"
          onChange={handleChange}
          value={userData.password}
        />
        <div className="pt-4">
          <Button text="Log in" onClick={handleSubmit} width="full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
