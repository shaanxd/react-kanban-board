import React, { useState, type FC } from "react";
import { useDraggable } from "@dnd-kit/core";

import type { TaskType } from "../types";

import TaskDetails from "./TaskDetails";
import DragHandler from "./DragHandler";
import DeleteTask from "./DeleteTask";
import Button from "./Button";
import AddUpdateTask from "./AddUpdateTask";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";

type Props = {
  task: TaskType;
};

const Task: FC<Props> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 50 : 1,
  };

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleOnDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteOpen(true);
  };

  const handleOnDeleteCancel = () => {
    setIsDeleteOpen(false);
  };

  const handleOnEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditOpen(true);
  };

  const handleOnEditCancel = () => {
    setIsEditOpen(false);
  };

  return (
    <>
      <div
        className={classNames(
          "card bg-base-300 text-base-content shadow-2xl border-1 relative cursor-pointer text-start"
        )}
        ref={setNodeRef}
        style={style}
        {...attributes}
        onClick={(_) => {
          _.preventDefault();
          _.stopPropagation();

          setIsDetailsOpen(true);
        }}
      >
        <DragHandler {...listeners} />
        <div className="card-body flex flex-col">
          <h3 className="md:text-md lg:text-lg xl:text-xl">{task.title}</h3>
          <span className="md:text-xs lg:text-sm truncate">
            {task.description}
          </span>
          <div className="flex ml-auto gap-4">
            <Button className="p-3" onClick={handleOnEdit} label="Edit Task">
              <PencilIcon className="size-4" />
            </Button>
            <Button
              className="p-3"
              onClick={handleOnDelete}
              label="Delete Task"
            >
              <TrashIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
      {isDetailsOpen && (
        <TaskDetails
          task={task}
          onClose={() => {
            setIsDetailsOpen(false);
          }}
        />
      )}
      {isDeleteOpen && (
        <DeleteTask task={task} onClose={handleOnDeleteCancel} />
      )}
      {isEditOpen && (
        <AddUpdateTask
          task={task}
          column={task.type}
          onClose={handleOnEditCancel}
        />
      )}
    </>
  );
};

export default Task;
