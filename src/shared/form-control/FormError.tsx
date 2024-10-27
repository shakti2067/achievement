type FormErrorProps = {
  error: string | undefined;
};

const FormError = ({ error }: FormErrorProps) => {
  if (!error) {
    return null;
  }

  return <div className="form-error">{error}</div>;
};

export default FormError;
