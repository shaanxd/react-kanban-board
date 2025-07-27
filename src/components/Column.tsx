import { useState, type FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import {
  PlusCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

import type { ColumnType } from "../types";
import { selectTasksByType } from "../selectors/board";

import DeleteColumn from "./DeleteColumn";
import AddUpdateTask from "./AddUpdateTask";
import Task from "./Task";
import DragHandler from "./DragHandler";
import Button from "./Button";
import AddUpdateColumn from "./AddUpdateColumn";

interface ColumnProps {
  column: ColumnType;
}

const Column: FC<ColumnProps> = ({ column }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id });

  const draggableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const tasks = useSelector(selectTasksByType(column.id));

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
    <div
      className="card bg-base-200 text-base-content min-w-sm flex-1 shadow-2xl border-1"
      ref={setDraggableNodeRef}
      style={draggableStyle}
      {...attributes}
    >
      <div className="relative flex flex-1 flex-col rounded-md">
        <DragHandler {...listeners} />
        <div className="flex gap-4 border-b-1 p-4">
          <h2 className="md:text-md lg:text-lg xl:text-xl my-auto">
            {column.label}{" "}
            <span className="badge badge-primary my-auto rounded-xl p-2">
              {tasks.length}
            </span>
          </h2>
          <Button
            className="ml-auto p-3"
            onClick={handleDeleteColumn}
            label="Delete Column"
          >
            <TrashIcon className="size-4" />
          </Button>
          <Button
            className="p-3"
            onClick={handleEditColumn}
            label="Edit Column"
          >
            <PencilIcon className="size-4" />
          </Button>
          <Button className="p-3" onClick={handleAddTask} label="Add Task">
            <PlusCircleIcon className="size-4" />
          </Button>
        </div>
        <div
          className="card-body relative flex-1 flex flex-col gap-4"
          ref={setNodeRef}
        >
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
          {!isDragging && isOver && (
            <div className="absolute inset-0 bg-black opacity-50 text-3xl flex border-1 justify-center items-center">
              <span>{column.label}</span>
            </div>
          )}
        </div>
        {isDeletePromptOpen && (
          <DeleteColumn column={column} onClose={handleDeleteCancel} />
        )}
        {isEditPromptOpen && (
          <AddUpdateColumn column={column} onClose={handleEditCancel} />
        )}
        {isAddTaskOpen && (
          <AddUpdateTask column={column.id} onClose={handleAddTaskCancel} />
        )}
      </div>
    </div>
  );
};

export default Column;
