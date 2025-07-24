import { useState, type FC } from "react";
import type { TaskType } from "../types";
import TaskDetails from "./TaskDetails";

type Props = {
  task: TaskType;
};

const Task: FC<Props> = ({ task }) => {
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);

  console.log("[X]", isTaskDetailsOpen);
  return (
    <div
      className="border-1 border-red-500 cursor-pointer text-start p-4 rounded-md"
      onClick={() => {
        setIsTaskDetailsOpen(true);
      }}
    >
      <h3 className="text-xl">{task.title}</h3>
      <span className="text-sm">{task.description}</span>
      {isTaskDetailsOpen && (
        <TaskDetails
          task={task}
          onClose={() => {
            setIsTaskDetailsOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Task;
