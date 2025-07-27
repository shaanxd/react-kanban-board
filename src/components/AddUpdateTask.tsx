import type { FC } from "react";
import { useDispatch } from "react-redux";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import type { TaskType } from "../types";
import { actions } from "../store/board";

import Modal from "./Modal";
import Button from "./Button";
import Input from "./input";
import { generateEntityId } from "../utils/board";

type Props = {
  task?: TaskType;
  column: string;
  onClose: () => void;
};

type FormType = {
  title: string;
  description: string;
};

const getDefaultValues = (task?: TaskType) => {
  return {
    title: task?.title || "",
    description: task?.description || "",
  };
};

const AddUpdateTask: FC<Props> = ({ task, column, onClose }) => {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>({
    defaultValues: getDefaultValues(task),
  });

  const handleFormSubmit: SubmitHandler<FormType> = (data) => {
    if (task) {
      dispatch(actions.updateTask({ ...task, ...data }));
    } else {
      const newTask = {
        id: generateEntityId(),
        ...data,
        type: column,
        comments: [],
      };
      dispatch(actions.addTask(newTask));
    }

    toast(`Task ${task ? "updated" : "created"} successfully!`);
    onClose();
  };

  return (
    <Modal
      title={task ? `Editing ${task.title}` : "Create Task"}
      onClose={onClose}
    >
      <form className="flex flex-col" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-col gap-4">
          <Input
            rhf={register("title", {
              required: "Title is required.",
            })}
            type="text"
            placeholder="Title"
            label="Title"
            error={errors.title}
          />
          <label className="floating-label">
            <span>Description</span>
            <textarea
              {...register("description")}
              placeholder="Description"
              className="w-full min-h-[200px] max-h-[200px] textarea textarea-primary"
            />
          </label>
        </div>
        <div className="modal-action">
          <Button type="submit">{task ? "Update" : "Create"} Task</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUpdateTask;
