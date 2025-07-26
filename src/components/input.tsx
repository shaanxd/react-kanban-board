import classNames from "classnames";
import type { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  error?: FieldError;
  label?: string;
  rhf: UseFormRegisterReturn;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: FC<InputProps> = ({ name, error, label, rhf, ...rest }) => {
  return (
    <label className="floating-label">
      <span>{label}</span>
      <input
        id={name}
        {...rest}
        {...rhf}
        className={classNames("input w-full", {
          "input-error": error,
          "input-primary": !error,
        })}
      />
      {error && <span className="text-error text-sm">{error?.message}</span>}
    </label>
  );
};

export default Input;
