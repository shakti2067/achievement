import { useMutation } from "react-query";
import { updateProfile } from "../api";
import { toast } from "react-toastify";

const useUpdateProfile = () => {
  return useMutation((data: any) => updateProfile(data), {
    onSuccess: () => {
      toast("Profile update successfully...", { type: "success" });
    },
    onError: () => {
      toast("Profile not update.", {
        type: "error",
      });
    },
  });
};

export default useUpdateProfile;
