import { useFormik } from "formik";
import { SignupFormProps } from "../types";
import { signupSchema } from "../validation";

export const useSignupForm = (
  action: CallableFunction,
  data?: SignupFormProps
) => {
  return useFormik<SignupFormProps>({
    initialValues: {
      username: data?.username || "",
      email: data?.email || "",
      password: data?.password || "",
    },
    validationSchema: signupSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: () => action(),
  });
};
