import type { FC, PropsWithChildren } from "react";
import React from "react";
import classNames from "classnames";

interface ButtonProps {
  type?: "button" | "submit";
  className?: string;
  label?: string;
  onClick?: (event: React.MouseEvent) => void;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  type = "button",
  className,
  label,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={classNames("btn btn-primary md:btn-md", className)}
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </button>
  );
};

export default Button;
