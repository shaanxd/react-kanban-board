import classNames from "classnames";
import type { FC, PropsWithChildren } from "react";

interface ModalProps {
  title: string;
  className?: string;
  onClose: () => void;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  title,
  className,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      <div
        className=" absolute inset-0 bg-black opacity-50"
        onClick={(_) => {
          _.preventDefault();
          _.stopPropagation();

          onClose();
        }}
      />
      <div
        className={classNames(
          "relative z-50 w-[500px] bg-black border border-red-500 shadow-md rounded-md",
          className
        )}
      >
        <div className="flex justify-between border-b-1 border-red-500 p-4">
          <h2 className="text-xl">{title}</h2>
        </div>
        <div className="flex flex-col p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
