import classNames from "classnames";
import type { FC, PropsWithChildren } from "react";

interface ButtonProps {
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  type = "button",
  className,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={classNames("border-1 border-red-500 p-2", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
