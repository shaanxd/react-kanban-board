import type { FC } from "react";
import { useDispatch } from "react-redux";

import type { ColumnType } from "../types";
import { actions } from "../store/board";

import PromptModal from "./PromptModal";

type Props = {
  column: ColumnType;
  onClose: () => void;
};

const DeleteColumn: FC<Props> = ({ column, onClose }) => {
  const dispatch = useDispatch();

  const handleOnConfirm = () => {
    dispatch(actions.removeColumn(column.id));
    onClose();
  };

  return (
    <PromptModal
      title={`Delete ${column.label}`}
      onConfirm={handleOnConfirm}
      onClose={onClose}
    >
      <span>
        Are you sure you would like to delete this column and it's associated
        tasks?
      </span>
    </PromptModal>
  );
};

export default DeleteColumn;
