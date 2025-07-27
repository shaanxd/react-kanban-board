import { useState, type FC } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import type { CommentType } from "../types";
import { selectComment } from "../selectors/board";

import Button from "./Button";

type Props = {
  id: CommentType["id"];
  level: number;
  onReplyTo: (_: CommentType) => void;
};

const Comment: FC<Props> = ({ id, level, onReplyTo }) => {
  const comment = useSelector(selectComment(id));

  const [areChildrenVisible, setAreChildrenVisible] = useState(level === 0);

  const handleOnReplyTo = () => {
    onReplyTo(comment);
  };

  const handleOnChildReplyTo = (child: CommentType) => {
    onReplyTo(child);
  };

  const handleToggleReplies = () => {
    setAreChildrenVisible((_) => !_);
  };

  const doesCommentHaveChildren = comment.children.length !== 0;

  return (
    <div
      className={classNames(
        "card border-1 rounded-none",
        level % 2 !== 0 ? "bg-base-100" : "bg-base-300"
      )}
    >
      <div className="card-body flex flex-col p-4 gap-4">
        <div className="flex gap-4">{comment.comment}</div>
        <div className="flex justify-end gap-2">
          {doesCommentHaveChildren && (
            <Button className="btn-xs" onClick={handleToggleReplies}>
              {areChildrenVisible ? "Hide" : "Show"} Replies
            </Button>
          )}
          {level < 2 && (
            <Button className="btn-xs" onClick={handleOnReplyTo}>
              Reply
            </Button>
          )}
        </div>
        {doesCommentHaveChildren && areChildrenVisible && (
          <div className="ml-3 flex flex-col">
            {comment.children.map((child) => (
              <Comment
                key={child}
                id={child}
                level={level + 1}
                onReplyTo={handleOnChildReplyTo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
