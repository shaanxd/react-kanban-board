import type { FC } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import type { TaskType } from "../types";
import { actions } from "../store/board";

import PromptModal from "./PromptModal";

type Props = {
  task: TaskType;
  onClose: () => void;
};

const DeleteTask: FC<Props> = ({ task, onClose }) => {
  const dispatch = useDispatch();

  const handleOnConfirm = () => {
    dispatch(actions.deleteTask(task.id));
    toast("Task Deleted Successfully!");
    onClose();
  };

  return (
    <PromptModal
      title={`Delete Task: ${task.title}`}
      onConfirm={handleOnConfirm}
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
        <span>
          Are you sure you would like to delete this column and it's associated
          tasks?
        </span>
      </div>
    </PromptModal>
  );
};

export default DeleteTask;
