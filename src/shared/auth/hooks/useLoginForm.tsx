/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { loginSchema } from "../validation";

interface LoginFormProps {
  email: string;
  password: string;
}

export const useLoginForm = (action: CallableFunction) => {
  return useFormik<LoginFormProps>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: () => action(),
  });
};
