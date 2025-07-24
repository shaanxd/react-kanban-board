import { useState, type FC } from "react";
import { AddColumnModal, Button } from "../components";
import { useBoardSelector } from "../store/board";
// import { ColumnType } from "../types";

import { Column } from "../components";

const Board: FC = () => {
  const [isAddColumnVisible, setIsAddColumnVisible] = useState(false);

  const { columns } = useBoardSelector();

  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      <div className="flex justify-between">
        <h1>React Kanban Board</h1>
        <div className="flex gap-4">
          <Button
            onClick={() => {
              setIsAddColumnVisible(true);
            }}
          >
            Add Columns
          </Button>
        </div>
      </div>
      <div className="border-1 border-red-500 flex flex-row flex-1 gap-4 p-4">
        {columns.map((column) => {
          return <Column key={column.id} column={column} />;
        })}
      </div>
      {isAddColumnVisible && (
        <AddColumnModal
          onClose={() => {
            setIsAddColumnVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default Board;
