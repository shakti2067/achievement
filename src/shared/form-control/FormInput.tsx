import { clsx } from "clsx";
import React from "react";

const FormInput = ({
  name,
  type,
  value,
  onChange,
  readOnly,
  className,
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      autoComplete="email"
      className={clsx(
        className,
        "form_input text-aurometalaaurus text-sm py-[0.413rem] px-[1.063rem]"
      )}
    />
  );
};

export default FormInput;
