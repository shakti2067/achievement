import { useMutation } from "react-query";
import { LoginFormProps } from "../types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api";
import { setToken } from "../../helper/util";

const useLogin = () => {
  const navigate = useNavigate();

  return useMutation((data: LoginFormProps) => signIn(data), {
    onSuccess: (res) => {
      setToken(res.data);
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export default useLogin;
