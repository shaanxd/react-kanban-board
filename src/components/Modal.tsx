import { type FC, type PropsWithChildren, type ReactNode } from "react";
import classNames from "classnames";

interface ModalProps {
  title?: ReactNode;
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
    <dialog className="modal modal-open">
      <div className={classNames("modal-box opacity-100", className)}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        {title && <h3 className="text-lg font-bold p-4 pb-0">{title}</h3>}
        <div className="flex flex-col p-4">{children}</div>
      </div>
    </dialog>
  );
};

export default Modal;
