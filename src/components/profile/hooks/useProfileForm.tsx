import { useFormik } from "formik";
import { useUser } from "../../../shared/provider/user-provider/UserProvider";
import { ProfileFormProps } from "../types";

const useProfileForm = (action: CallableFunction) => {
  const { user }: any = useUser();

  return useFormik<ProfileFormProps>({
    initialValues: {
      first_name: user?.[0]?.first_name || "",
      last_name: user?.[0]?.last_name || "",
      email: user?.[0]?.email || "",
      phone: user?.[0]?.phone || "",
    },
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: () => action(),
  });
};

export default useProfileForm;
