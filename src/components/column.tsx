import { useState, type FC, type PropsWithChildren } from "react";
import Button from "./button";
import type { ColumnType } from "../types";
import DeleteColumnModal from "./deleteColumnModal";
import EditColumnModal from "./editColumnModal";
import AddTask from "./AddTask";
import { useColumnTaskSelector } from "../store/board";
import Task from "./Task";

interface ColumnProps {
  column: ColumnType;
}

const Column: FC<PropsWithChildren<ColumnProps>> = ({ column, children }) => {
  const tasks = useColumnTaskSelector(column.id);

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);
  const [isEditPromptOpen, setIsEditPromptOpen] = useState(false);

  const handleDeleteColumn = () => {
    setIsDeletePromptOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeletePromptOpen(false);
  };

  const handleEditColumn = () => {
    setIsEditPromptOpen(true);
  };

  const handleEditCancel = () => {
    setIsEditPromptOpen(false);
  };

  const handleAddTask = () => {
    setIsAddTaskOpen(true);
  };

  const handleAddTaskCancel = () => {
    setIsAddTaskOpen(false);
  };

  return (
    <div className="flex-1 border-1 min-w-sm border-red-500 flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <h3 className="border-1 border-blue-500 p-2 flex-1 text-start">
          {column.label}
        </h3>
        <Button className="ml-auto" onClick={handleDeleteColumn}>
          Delete
        </Button>
        <Button onClick={handleEditColumn}>Edit</Button>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
      <Button onClick={handleAddTask}>Add Task</Button>
      {isDeletePromptOpen && (
        <DeleteColumnModal column={column} onClose={handleDeleteCancel} />
      )}
      {isEditPromptOpen && (
        <EditColumnModal column={column} onClose={handleEditCancel} />
      )}
      {isAddTaskOpen && (
        <AddTask column={column} onClose={handleAddTaskCancel} />
      )}
    </div>
  );
};

export default Column;
