/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "../../button/Button";
import useLogin from "../hooks/useLogin";
import { useLoginForm } from "../hooks/useLoginForm";

import { ReactComponent as EyeIcon } from "../../../assets/images/icons/eye.svg";
import { ReactComponent as CheckedEyeIcon } from "../../../assets/images/icons/checked-eye.svg";

import Style from "../../../assets/css/auth.module.css";
import { useState } from "react";
import logo from "../../../assets/images/logo-white-font.png";


const Login = () => {
  const { mutate: loginFn } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const { handleChange, handleSubmit, errors, values } = useLoginForm(() =>
    loginFn(values)
  );

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mt-[8rem]">
    <form className={Style.loginForm} onSubmit={handleSubmit}>
       <div className="flex h-20 items-center justify-center mb-6 bg-oldBurgundy rounded-lg">
        <img src={logo} alt="logo-img" className="w-44" />
      </div>
      <h3 className="mb-6 text-[24px] font-semibold text-center text-oldBurgundy">Login Authentication</h3>
      <div className="mb-6">
        <label htmlFor="email" className={Style.formLabel}>
          Username
        </label>
        <input
          type="text"
          id="email"
          onChange={handleChange}
          value={values.email}
          className={Style.formInput}
          placeholder="Enter Username"
        />

        {errors.email ? (
          <span className="text-xs text-red-500 pl-1">{errors.email}</span>
        ) : (
          ""
        )}
      </div>
      <div className="mb-6 relative">
        <label htmlFor="password" className={Style.formLabel}>
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          onChange={handleChange}
          value={values.password}
          className={Style.formInput}
          placeholder="Enter Password"
        />
        <button
          type="button"
          onClick={onShowPassword}
          className="mx-auto absolute right-3 top-[41px] cursor-pointer"
        >
          {showPassword ? <CheckedEyeIcon /> : <EyeIcon />}
        </button>
        {errors.password ? (
          <span className="text-xs text-red-500 pl-1">{errors.password}</span>
        ) : (
          ""
        )}
      </div>
      <Button type="submit" className={Style.loginButton} title="Login" />
    </form>
    </div>
  );
};

export default Login;
