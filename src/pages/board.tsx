import { useState, type FC } from "react";
import {
  closestCenter,
  DndContext,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useDispatch } from "react-redux";

import { actions, useBoardSelector } from "../store/board";

import Column from "../components/Column";
import Button from "../components/Button";
import AddUpdateColumn from "../components/AddUpdateColumn";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const Board: FC = () => {
  const dispatch = useDispatch();

  const [isAddColumnVisible, setIsAddColumnVisible] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const { columns, tasks } = useBoardSelector();

  const handleOnDragEnd = ({ active, over }: DragEndEvent) => {
    /** Nothing to do if no drag/drag IDs */
    if (active?.id === over?.id) {
      return;
    }
    const allIds = columns.map(({ id }) => id);

    const oldIndex = allIds.indexOf(active.id as string);
    const newIndex = allIds.indexOf(over?.id as string);

    /** Check if the both the drag target and drop
     * target are columns and are not the same target */
    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      dispatch(actions.reorderColumns(arrayMove(columns, oldIndex, newIndex)));
      return;
    }

    /** Continue if its not a column drag to find the task that was dragged. */
    const task = tasks.find(({ id }) => id === active.id);
    const column = columns.find(({ id }) => id === over?.id);

    if (!task || !column || task.type === column.id) {
      return;
    }

    dispatch(actions.updateTask({ ...task, type: column.id }));
  };

  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      <div className="flex justify-between">
        <h1 className="text-4xl my-auto">React Kanban Board</h1>
        <div className="flex gap-4">
          <label className="flex cursor-pointer gap-2 my-auto">
            <MoonIcon className="size-4 my-auto" />
            <input
              type="checkbox"
              value="lofi"
              className="toggle theme-controller"
            />
            <SunIcon className="size-4 my-auto" />
          </label>
          <Button
            onClick={() => {
              setIsAddColumnVisible(true);
            }}
          >
            Add Columns
          </Button>
        </div>
      </div>
      <div className="flex flex-row flex-1 gap-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleOnDragEnd}
        >
          <SortableContext
            items={columns.map(({ id }) => id)}
            strategy={horizontalListSortingStrategy}
          >
            {columns.map((column) => {
              return <Column key={column.id} column={column} />;
            })}
          </SortableContext>
        </DndContext>
      </div>
      {isAddColumnVisible && (
        <AddUpdateColumn
          onClose={() => {
            setIsAddColumnVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default Board;
