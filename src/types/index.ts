export type ColumnType = {
  id: string;
  label: string;
};

export type TaskType = {
  id: number;
  title: string;
  description: string;
  type: string;
  comments: CommentType["id"][];
};

export type CommentType = {
  id: number;
  comment: string;
  children: CommentType["id"][];
};
