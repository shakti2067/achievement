import { useMutation } from "react-query";
import { SignupRequestParams } from "../types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { signUp } from "../api";
import { useSignupForm } from "./useSignupForm";

const useSignup = () => {
  const { resetForm } = useSignupForm(() => {
    return "";
  });

  const navigate = useNavigate();
  return useMutation((data: SignupRequestParams) => signUp(data), {
    onSuccess: () => {
      navigate("/login");
      resetForm();
      toast("Auth user has been created!", { type: "success" });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.message);
      toast(error.response?.data.message || "cannot create the auth user.", {
        type: "error",
      });
    },
  });
};

export default useSignup;
