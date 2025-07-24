import type { FC } from "react";
import type { TaskType } from "../types";
import Modal from "./modal";

type Props = {
  task: TaskType;
  onClose: () => void;
};

const TaskDetails: FC<Props> = ({ task, onClose }) => {
  return (
    <Modal title={task.title} onClose={onClose}>
      <div className="flex flex-col text-start gap-4">
        <span>{task.description}</span>
      </div>
    </Modal>
  );
};

export default TaskDetails;
