import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../store";

export const selectBoard = (state: RootState) => state.board;

export const selectColumn = (id: string) =>
  createSelector(selectBoard, (board) =>
    board.columns.find((c) => c.id === id)
  );

export const selectTasksByType = (type: string) =>
  createSelector(selectBoard, (board) =>
    board.tasks.filter((task) => task.type === type)
  );

export const selectComment = (id: number) =>
  createSelector(selectBoard, (board) => board.comments[id]);
