import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().required("User id required."),
  password: Yup.string().required("Password is required."),
});

export const signupSchema = Yup.object().shape({
  username: Yup.string().required("username is required."),
  email: Yup.string().required("Email id required."),
  password: Yup.string().min(8).required("Password is required"),
});
