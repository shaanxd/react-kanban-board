import type { FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";

import { actions, useBoardSelector } from "../store/board";
import { generateBoardId } from "../utils/board";

import Modal from "./Modal";
import Button from "./Button";
import Input from "./input";
import type { ColumnType } from "../types";

interface Props {
  column?: ColumnType;
  onClose: () => void;
}

type FormType = {
  name: string;
};

const AddUpdateColumn: FC<Props> = ({ column, onClose }) => {
  const dispatch = useDispatch();
  const { columns } = useBoardSelector();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>({
    defaultValues: {
      name: column?.label || "",
    },
  });

  const handleFormSubmit: SubmitHandler<FormType> = (data) => {
    if (column) {
      dispatch(actions.updateColumn({ id: column.id, label: data.name }));
    } else {
      dispatch(actions.addColumn(data.name));
    }
    onClose();
  };

  return (
    <Modal
      title={`${column ? `Editing ${column.label}` : "Create"} Column`}
      onClose={onClose}
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Input
          label="Column name"
          rhf={register("name", {
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
          error={errors.name}
        />
        <div className="modal-action">
          <Button type="submit">{column ? "Update" : "Create"} Column</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUpdateColumn;
