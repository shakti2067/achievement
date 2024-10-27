import clsx from "clsx";
import Loader from "../loader/Loader";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: string;
  title: string;
  loader?: boolean;
  variant?: "primary" | "secondary" | "danger";
  type: "button" | "submit" | "reset";
};

const Button = ({ variant = "primary", ...props }: ButtonProps) => {
  return (
    <button {...props} className={clsx(`btn btn-${variant}`, props.className)}>
      {props.loader ? <Loader /> : null}
      {props.icon ? <img src={props.icon} alt="button-icon" /> : null}
      {props.title}
    </button>
  );
};

export default Button;
