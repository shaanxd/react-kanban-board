import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { generateBoardId } from "../utils/board";
import type { ColumnType, CommentType, TaskType } from "../types";

const getDefaultColumns = () => {
  return [
    { id: "todo", label: "Todo" },
    { id: "in-progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
  ];
};

export type BoardReducer = {
  columns: ColumnType[];
  tasks: TaskType[];
  comments: Record<number, CommentType>;
};

export const { actions, reducer } = createSlice({
  name: "board",
  reducerPath: "board",
  initialState: {
    columns: getDefaultColumns(),
    tasks: [] as TaskType[],
    comments: {} as Record<number, CommentType>,
  },
  reducers: {
    addColumn: (state, { payload }: PayloadAction<string>) => {
      const columnId = generateBoardId(payload);

      state.columns.push({ id: columnId, label: payload });
    },
    removeColumn: (state, { payload }: PayloadAction<string>) => {
      state.columns = state.columns.filter(({ id }) => id !== payload);
      state.tasks = state.tasks.filter(({ type }) => type !== payload);
    },
    updateColumn: (
      state,
      { payload: { id, label } }: PayloadAction<ColumnType>
    ) => {
      const columnIdx = state.columns.findIndex((_) => _.id === id);

      if (columnIdx === -1) {
        return;
      }

      const columnId = generateBoardId(label);
      state.columns[columnIdx] = {
        id: columnId,
        label,
      };

      state.tasks = state.tasks.map((task) =>
        task.type === id ? { ...task, type: columnId } : task
      );
    },
    reorderColumns: (state, { payload }: PayloadAction<ColumnType[]>) => {
      state.columns = payload;
    },
    addTask: (state, { payload }: PayloadAction<TaskType>) => {
      state.tasks.push(payload);
    },
    updateTask: (state, { payload }: PayloadAction<TaskType>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === payload.id ? { ...payload } : task
      );
    },
    deleteTask: (state, { payload }: PayloadAction<TaskType["id"]>) => {
      state.tasks = state.tasks.filter((task) => task.id !== payload);
    },
    addComment: (
      state,
      {
        payload,
      }: PayloadAction<CommentType & { taskId: number; parentId?: number }>
    ) => {
      if (payload.parentId) {
        state.comments[payload.parentId].children.push(payload.id);
      } else {
        const taskIdx = state.tasks.findIndex(
          ({ id }) => id === payload.taskId
        );
        if (taskIdx === -1) {
          return;
        }
        state.tasks[taskIdx].comments.push(payload.id);
      }

      state.comments[payload.id] = payload;
    },
  },
});
