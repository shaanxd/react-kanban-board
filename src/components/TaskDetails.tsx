import { useEffect, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { type ColumnType, type CommentType, type TaskType } from "../types";
import {
  actions,
  useColumnSelector,
  useColumnTaskSelector,
} from "../store/board";
import { generateEntityId } from "../utils/board";

import Input from "./input";
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

  const column = useColumnSelector(task.type);

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
        <div className="flex flex-col gap-4">
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
          {replyingTo && (
            <div className="flex justify-between">
              <span className="text-primary-content">
                Replying to: {replyingTo?.comment?.substring(0, 10)}...
              </span>
              <button
                type="button"
                className="btn btn-xs btn-ghost"
                onClick={handleOnReplyToCancel}
              >
                ✕
              </button>
            </div>
          )}
          <Input
            label={replyingTo ? "" : "Comment"}
            rhf={register("comment", {
              required: true,
            })}
            type="text"
            placeholder="Write your comment here.."
          />
        </form>
      </div>
    </Modal>
  );
};

export default TaskDetails;
