import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { RootState } from ".";
import { generateBoardId } from "../utils/board";
import type { ColumnType, TaskType } from "../types";

const getDefaultColumns = () => {
  return [
    { id: "todo", label: "Todo" },
    { id: "in-progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
  ];
};

export const { actions, reducer } = createSlice({
  name: "board",
  reducerPath: "board",
  initialState: {
    columns: getDefaultColumns(),
    tasks: [] as TaskType[],
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
        task.type === id ? { ...task, type: id } : task
      );
    },
    addTask: (state, { payload }: PayloadAction<TaskType>) => {
      state.tasks.push(payload);
    },
  },
});

export const useBoardSelector = () => {
  return useSelector((state: RootState) => state.board);
};

export const useColumnTaskSelector = (column: string) => {
  return useSelector((state: RootState) =>
    state.board.tasks.filter(({ type }) => type === column)
  );
};
