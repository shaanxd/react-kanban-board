import type { FC } from "react";
import PromptModal from "./promptModal";
import Button from "./button";
import { useDispatch } from "react-redux";
import type { ColumnType } from "../types";
import { actions } from "../store/board";

type Props = {
  column: ColumnType;
  onClose: () => void;
};

const DeleteColumnModal: FC<Props> = ({ column, onClose }) => {
  const dispatch = useDispatch();

  return (
    <PromptModal title={`Delete ${column.label}`} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <span>
          Are you sure you would like to delete this column and it's associated
          tasks?
        </span>
        <div className="flex gap-4">
          <Button
            className="flex-1"
            onClick={() => {
              dispatch(actions.removeColumn(column.id));
              onClose();
            }}
          >
            Confirm
          </Button>
          <Button className="flex-1" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </PromptModal>
  );
};

export default DeleteColumnModal;
