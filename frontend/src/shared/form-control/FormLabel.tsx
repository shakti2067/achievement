import clsx from "clsx";
import React from "react";

const FormLabel = ({
  title,
  className,
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      className={clsx(
        "form_label block text-sm font-medium leading-6 text-gray-700",
        className
      )}
    >
      {title}
    </label>
  );
};

export default FormLabel;
