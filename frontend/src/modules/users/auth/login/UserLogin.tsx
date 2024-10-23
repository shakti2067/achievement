import { useFormik } from "formik";

import authStyle from "../../../../assets/css/auth.module.css";
import Button from "../../../../shared/button/Button";
import { useMutation } from "react-query";
import { setToken } from "../../../../shared/helper/util";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type UserLoginProps = {
  onSubmit: any;
};

const UserLogin = ({ onSubmit }: UserLoginProps) => {
  const navigate = useNavigate();

  const { mutate: userLogin } = useMutation((data: any) => onSubmit(data), {
    onSuccess: (res: any) => {
      setToken(res?.data);
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validationSchema: loginSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      userLogin(values);
    },
  });

  return (
    <form className={authStyle.loginForm} onSubmit={formik.handleSubmit}>
      <h3 className="py-8 text-[24px]">Login</h3>
      <div className="mb-6">
        <label htmlFor="email" className={authStyle.formLabel}>
          Your Username
        </label>
        <input
          type="text"
          id="email"
          onChange={formik.handleChange}
          value={formik?.values.email}
          className={authStyle.formInput}
          placeholder="name@flowbite.com"
        />
        {formik?.errors.email ? (
          <span className="text-xs text-red-500 pl-1">
            {formik?.errors.email}
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="mb-6">
        <label htmlFor="password" className={authStyle.formLabel}>
          Your password
        </label>
        <input
          type="password"
          id="password"
          onChange={formik.handleChange}
          value={formik?.values.password}
          className={authStyle.formInput}
        />
        {formik?.errors.password ? (
          <span className="text-xs text-red-500 pl-1">
            {formik?.errors.password}
          </span>
        ) : (
          ""
        )}
      </div>
      <Button type="submit" className={authStyle.loginButton} title="Login" />
    </form>
  );
};

export default UserLogin;
