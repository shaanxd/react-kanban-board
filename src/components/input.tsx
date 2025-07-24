import classNames from "classnames";
import type { FC } from "react";
import type { ChangeHandler } from "react-hook-form";

interface InputProps {
  className?: string;
  value?: string;
  onChange: ChangeHandler;
}

const Input: FC<InputProps> = ({ className, value, onChange }) => {
  return (
    <input
      className={classNames("bg-gray-600 rounded-lg p-2", className)}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
