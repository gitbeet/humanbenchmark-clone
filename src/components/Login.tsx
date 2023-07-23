import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utilities/hooks";
import { login, reset, logout } from "../features/auth/userSlice";

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
    <div className="pt-16 pb-32">
      <h1 className="text-3xl text-center text-primary-200 font-semibold ">
        Login
      </h1>
      <div className="flex flex-col px-10 space-y-12 pt-16">
        {message && <h1 className="text-danger-500 text-center">{message}</h1>}
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
