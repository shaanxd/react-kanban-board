import type { FC, PropsWithChildren } from "react";

import Modal from "./Modal";
import Button from "./Button";

type PromptModalProps = {
  title: string;
  onConfirm: () => void;
  onClose: () => void;
};

const PromptModal: FC<PropsWithChildren<PromptModalProps>> = ({
  title,
  children,
  onConfirm,
  onClose,
}) => {
  return (
    <Modal title={title} onClose={onClose}>
      {children}
      <div className="modal-action">
        <Button onClick={onConfirm}>Confirm</Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default PromptModal;
