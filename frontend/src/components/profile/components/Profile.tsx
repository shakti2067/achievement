import { useNavigate } from "react-router-dom";

import useProfileForm from "../hooks/useProfileForm";
import useUpdateProfile from "../hooks/useUpdateProfile";

import FormLabel from "../../../shared/form-control/FormLabel";
import FormInput from "../../../shared/form-control/FormInput";
import Button from "../../../shared/button/Button";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

const Profile = () => {
  const navigation = useNavigate();

  const { mutate: updateProfileFn, isLoading } = useUpdateProfile();

  const { handleSubmit, values, handleChange } = useProfileForm(() => {
    updateProfileFn(values);
  });

  return (
    <>
      <div
        className={
          "flex justify-start items-center gap-[1.125rem] mb-[1.875rem] flex-wrap"
        }
      >
        <button
          className="back_button-arrow-left rounded-md py-2 px-1.5"
          onClick={() => navigation(-1)}
        >
          <ArrowLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <p className="text-2xl text-blackolive dark:text-white">Profile</p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-[37.75rem]">
        <div className="form-group mb-6">
          <FormLabel title="First Name" className="!font-medium mb-1" />
          <FormInput
            value={values?.first_name}
            type="text"
            onChange={handleChange}
            name="first_name"
          />
        </div>
        <div className="form-group mb-6">
          <FormLabel title="Last Name" className="!font-medium mb-1" />
          <FormInput
            value={values?.last_name}
            type="text"
            onChange={handleChange}
            name="last_name"
          />
        </div>
        <div className="form-group mb-6">
          <FormLabel title="Email" className="!font-medium mb-1" />
          <FormInput
            value={values?.email}
            type="text"
            onChange={handleChange}
            name="email"
          />
        </div>
        <div className="form-group mb-6">
          <FormLabel title="Phone" className="!font-medium mb-1" />
          <FormInput
            value={values?.phone}
            type="text"
            onChange={handleChange}
            name="phone"
          />
        </div>
        <Button
          type="submit"
          title="Save"
          loader={isLoading}
          disabled={isLoading}
          className="px-14 ml-auto"
        />
      </form>
    </>
  );
};

export default Profile;
