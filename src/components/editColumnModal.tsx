import type { FC } from "react";
import Modal from "./modal";
import Button from "./button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { actions, useBoardSelector } from "../store/board";
import { generateBoardId } from "../utils/board";
import type { ColumnType } from "../types";
import { useDispatch } from "react-redux";

interface EditColumnModalProps {
  column: ColumnType;
  onClose: () => void;
}

type FormType = {
  name: string;
};

// Define Yup Schema
const EditColumnModal: FC<EditColumnModalProps> = ({ column, onClose }) => {
  const dispatch = useDispatch();

  const { columns } = useBoardSelector();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>({
    defaultValues: {
      name: column.label,
    },
  });

  const handleFormSubmit: SubmitHandler<FormType> = (data) => {
    dispatch(actions.updateColumn({ id: column.id, label: data.name }));
    onClose();
  };

  return (
    <Modal title={"Update Column"} onClose={onClose}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <input
          {...register("name", {
            required: "Column name is required.",
            validate: (value) => {
              if (value === column.label) {
                return "Column name cannot be the same";
              }
              const valueId = generateBoardId(value);
              if (columns.find(({ id }) => id === valueId)) {
                return "Column already exists.";
              }
              return true;
            },
          })}
          type="text"
          placeholder="Column Name"
          className="bg-gray-500 rounded-lg p-2"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name?.message}</span>
        )}
        <Button type="submit">Update Column</Button>
      </form>
    </Modal>
  );
};

export default EditColumnModal;
