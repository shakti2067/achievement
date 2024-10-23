import authStyle from "../../../../assets/css/auth.module.css";

import {
  SignupFormProps,
  SignupRequestParams,
} from "../../../../shared/auth/types";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import FormLabel from "../../../../shared/form-control/FormLabel";
import FormInput from "../../../../shared/form-control/FormInput";
import FormError from "../../../../shared/form-control/FormError";
import Button from "../../../../shared/button/Button";

const UserSignup = ({ onSubmit }: any) => {
  const navigate = useNavigate();

  const { mutate: userSignup } = useMutation(
    (data: SignupRequestParams) => onSubmit(data),
    {
      onSuccess: () => {
        navigate("/login");
        toast("Auth user has been created!", { type: "success" });
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error?.message);
        toast(error.response?.data.message || "cannot create the auth user.", {
          type: "error",
        });
      },
    }
  );

  const formik = useFormik<SignupFormProps>({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    // validationSchema: signupSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (values) => userSignup(values),
  });

  return (
    <>
      <form className={authStyle.loginForm} onSubmit={formik.handleSubmit}>
        <h3 className="py-8 text-[24px]">Signup</h3>
        <div className="form-group">
          <FormLabel title="User name" />
          <FormInput
            onChange={formik.handleChange}
            name="username"
            type="text"
            value={formik?.values?.username || ""}
            className={formik?.errors.username ? "is-error" : ""}
          />
          <FormError error={formik?.errors.username} />
        </div>

        <div className="form-group">
          <FormLabel title="Email address" />
          <FormInput
            onChange={formik?.handleChange}
            name="email"
            type="text"
            value={formik?.values?.email || ""}
            className={formik?.errors.email ? "is-error" : ""}
          />
          <FormError error={formik?.errors.email} />
        </div>

        <div className="form-group">
          <FormLabel title="Password" />
          <div className="mt-2 relative">
            <FormInput
              value={formik?.values?.password}
              onChange={formik?.handleChange}
              type={"password"}
              name="password"
              className={formik?.errors.password ? "is-error" : ""}
            />
          </div>
          <FormError error={formik?.errors.password} />
        </div>
        <Button
          type="submit"
          className={authStyle.loginButton}
          title="Signup"
        />
      </form>
    </>
  );
};
export default UserSignup;
