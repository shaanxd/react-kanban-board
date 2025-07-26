import type { FC, PropsWithChildren } from "react";
import React from "react";
import classNames from "classnames";

interface ButtonProps {
  type?: "button" | "submit";
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
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
      className={classNames("btn btn-primary", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
