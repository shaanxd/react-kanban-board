import type { FC } from "react";
import Modal from "./modal";
import type { ColumnType } from "../types";
import { useDispatch } from "react-redux";
import { actions } from "../store/board";
import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "./button";

type Props = {
  column: ColumnType;
  onClose: () => void;
};

type FormType = {
  title: string;
  description: string;
};

const AddTask: FC<Props> = ({ column, onClose }) => {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>({});

  const handleFormSubmit: SubmitHandler<FormType> = (data) => {
    dispatch(
      actions.addTask({
        id: new Date().getTime(),
        ...data,
        type: column.id,
        comments: [],
      })
    );
    onClose();
  };

  return (
    <Modal title={"Add Task"} onClose={onClose}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <input
          {...register("title", {
            required: "Title is required.",
          })}
          type="text"
          placeholder="Title"
          className="bg-gray-500 rounded-lg p-2"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title?.message}</span>
        )}
        <textarea
          {...register("description")}
          placeholder="Description"
          className="min-h-[200px] max-h-[200px] bg-gray-500 rounded-lg p-2"
        />
        <Button type="submit">Add Task</Button>
      </form>
    </Modal>
  );
};

export default AddTask;
