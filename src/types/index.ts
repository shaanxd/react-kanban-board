export type ColumnType = {
  id: string;
  label: string;
};

export type Comment = {
  comment: string;
  children: Comment[];
};

export type TaskType = {
  id: number;
  title: string;
  description: string;
  type: string;
  comments: Comment[];
};
