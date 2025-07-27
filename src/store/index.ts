import { configureStore } from "@reduxjs/toolkit";

import { reducer as board, type BoardReducer } from "./board";

const getPersistedState = () => {
  const prevState = localStorage.getItem("APP_STATE");

  if (!prevState) {
    return undefined;
  }
  return JSON.parse(prevState) as { board: BoardReducer };
};

export const store = configureStore({
  reducer: {
    board,
  },
  preloadedState: getPersistedState(),
});

store.subscribe(() =>
  localStorage.setItem("APP_STATE", JSON.stringify(store.getState()))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
