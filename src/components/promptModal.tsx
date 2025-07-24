import type { FC, PropsWithChildren } from "react";
import Modal from "./modal";

type PromptModalProps = {
  title: string;
  onClose: () => void;
};

const PromptModal: FC<PropsWithChildren<PromptModalProps>> = ({
  title,
  children,
  onClose,
}) => {
  return (
    <Modal title={title} onClose={onClose}>
      {children}
    </Modal>
  );
};

export default PromptModal;
