import type { FC } from "react";
import Modal from "./modal";
import Button from "./button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { actions, useBoardSelector } from "../store/board";
import { generateBoardId } from "../utils/board";
import { useDispatch } from "react-redux";

interface AddColumnModalProps {
  onClose: () => void;
}

type FormType = {
  name: string;
};

const AddColumnModal: FC<AddColumnModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { columns } = useBoardSelector();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>();

  const handleFormSubmit: SubmitHandler<FormType> = (data) => {
    dispatch(actions.addColumn(data.name));
    onClose();
  };

  return (
    <Modal title={"Add Column"} onClose={onClose}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <input
          {...register("name", {
            required: "Column name is required.",
            validate: (value) => {
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
        <Button type="submit">Add Column</Button>
      </form>
    </Modal>
  );
};

export default AddColumnModal;
