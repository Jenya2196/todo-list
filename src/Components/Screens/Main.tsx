'use client';
import React, { useEffect, useState } from 'react';
import AddBlockTask from './AddBlockTask';
import PagesGroup from './PageGroup/PagesGroup';
import { useTodo } from '@/context/TodoContext';
import AddTask from './PageGroup/AddTask';
import EditTask from './PageGroup/EditTask';
import { Checkbox } from '../ui';

type Props = {};

function Main({}: Props) {
  const { lists, manager, update } = useTodo();
  const [pageId, setPageId] = useState<number | null>(null);

  useEffect(() => {
    if (lists.length > 0) {
      setPageId(lists[0].id);
    }
  }, []);

  const currentList = lists.find((list) => list.id === pageId);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-2 p-2 sm:p-4">
      <PagesGroup page={pageId} onPage={setPageId} />

      {lists.length === 0 ? (
        <h1 className="mb-6 text-center text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
          You don't have any task groups yet
        </h1>
      ) : (
        <>
          <h1 className="mb-6 text-center text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
            Your Task List
          </h1>

          {lists.length === 0 ? (
            <p className="text-center text-gray-500 italic dark:text-gray-400">
              The list is empty
            </p>
          ) : (
            <div className="mt-4 w-full space-y-3 sm:space-y-4">
              {currentList &&
                currentList.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex flex-col gap-2 rounded-md p-2 ${
                      task.completed
                        ? 'bg-green-100 text-green-900 line-through dark:bg-green-700/50 dark:text-green-200'
                        : 'bg-gray-50 text-gray-900 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-full text-center text-sm font-bold sm:text-base">
                        {task.name}
                      </div>
                      <div className="flex gap-2">
                        <EditTask id={pageId} taskId={task.id} />
                      </div>
                    </div>

                    {task.subTasks && task.subTasks.length > 0 && (
                      <ul className="space-y-1">
                        {task.subTasks.map((sub) => (
                          <li
                            key={sub.id}
                            className={`flex items-start justify-between rounded border border-black/30 bg-white p-2 text-xs sm:text-sm dark:bg-gray-800 ${
                              sub.completed
                                ? 'bg-green-500/30 line-through dark:text-green-200'
                                : ''
                            }`}
                          >
                            <div>{sub.text}</div>
                            <div className="flex items-center gap-2">
                              <Checkbox
                                checked={sub.completed}
                                onChange={() => {
                                  if (!pageId) return;
                                  manager.ToggleCompleted(
                                    pageId,
                                    task.id,
                                    sub.id
                                  );
                                  update();
                                }}
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                    <AddTask id={pageId} taskId={task.id} />
                  </div>
                ))}

              {pageId && <AddBlockTask id={pageId} />}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Main;
