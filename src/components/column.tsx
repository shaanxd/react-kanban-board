import { useState, type FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import {
  PlusCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

import type { ColumnType } from "../types";
import { useColumnTaskSelector } from "../store/board";

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
    <div
      className="card bg-primary text-primary-content min-w-sm flex-1 shadow-2xl"
      ref={setDraggableNodeRef}
      style={draggableStyle}
      {...attributes}
    >
      <div className="relative flex flex-1 flex-col border-5">
        <DragHandler {...listeners} />
        <div className="flex gap-4 border-b-5 p-4">
          <h2 className="text-2xl my-auto">
            {column.label}{" "}
            <span className="badge badge-secondary my-auto rounded-xl p-2">
              {tasks.length}
            </span>
          </h2>
          <Button className="ml-auto p-3" onClick={handleDeleteColumn}>
            <TrashIcon className="size-4 text-primary-content" />
          </Button>
          <Button className="p-3" onClick={handleEditColumn}>
            <PencilIcon className="size-4 text-primary-content" />
          </Button>
          <Button className="p-3" onClick={handleAddTask}>
            <PlusCircleIcon className="size-4 text-primary-content" />
          </Button>
        </div>
        <div
          className="card-body relative flex-1 flex flex-col gap-4"
          ref={setNodeRef}
        >
          {!isDragging && isOver && (
            <div className="absolute inset-0 bg-black opacity-50 text-3xl flex border-1 justify-center items-center">
              <span>{column.label}</span>
            </div>
          )}
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
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
