import { useEffect, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import toast from "react-hot-toast";

import { type CommentType, type TaskType } from "../types";
import { actions } from "../store/board";
import { generateEntityId } from "../utils/board";
import { selectColumn } from "../selectors/board";

import Input from "./Input";
import Modal from "./Modal";
import Comment from "./Comment";

type Props = {
  task: TaskType;
  onClose: () => void;
};

type FormType = {
  comment: string;
};

const TaskDetails: FC<Props> = ({ task, onClose }) => {
  const dispatch = useDispatch();

  const column = useSelector(selectColumn(task.type));

  const [replyingTo, setReplyingTo] = useState<CommentType | null>(null);

  const { register, reset, handleSubmit, setFocus } = useForm<FormType>({});

  useEffect(() => {
    if (replyingTo) {
      setFocus("comment");
    }
  }, [replyingTo, setFocus]);

  const handleOnCommentSubmit = (data: FormType) => {
    const params = {
      id: generateEntityId(),
      taskId: task.id,
      parentId: replyingTo?.id,
      comment: data.comment,
      children: [],
    };

    dispatch(actions.addComment(params));
    toast("Posted comment!");
    reset();
    setReplyingTo(null);
  };

  const handleOnReplyTo = (comment: CommentType) => {
    setReplyingTo(comment);
  };

  const handleOnReplyToCancel = () => {
    setReplyingTo(null);
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl cursor-text">{task.title}</h3>
          <span className="badge badge-primary">{column?.label}</span>
        </div>
        <span className="text-sm">{task.description}</span>

        <h3 className="text-xl">Comments</h3>
        <div className="flex flex-col gap-4 max-h-[300px] overflow-auto">
          {task.comments.map((comment) => {
            return (
              <Comment
                key={comment}
                id={comment}
                level={0}
                onReplyTo={handleOnReplyTo}
              />
            );
          })}
        </div>
        <form onSubmit={handleSubmit(handleOnCommentSubmit)}>
          <Input
            label={replyingTo ? "" : "Comment"}
            rhf={register("comment", {
              required: true,
            })}
            type="text"
            placeholder="Write your comment here.."
            className={classNames({ "rounded-t-none": replyingTo })}
          />
          {replyingTo && (
            <div className="flex justify-between rounded-b-lg bg-primary text-primary-content px-2">
              <span className="truncate">
                Replying to: {replyingTo?.comment}
              </span>
              <button
                type="button"
                className="btn btn-xs p-0 btn-ghost"
                onClick={handleOnReplyToCancel}
              >
                ✕
              </button>
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default TaskDetails;
