'use client';
import React, { useEffect, useState } from 'react';
import Button from '../UI/Bottons/Button';
import { Pencil, Plus, Trash } from 'lucide-react';
import Checkbox from '../UI/Bottons/Checkbox';
import AddBlockTask from './AddBlockTask';
import PagesGroup from './PageGroup/PagesGroup';
import { useTodo } from '@/context/TodoContext';
import AddTask from './PageGroup/AddTask';
import EditTask from './PageGroup/EditTask';

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
    <div className="w-full flex flex-col items-center gap-2 max-w-3xl mx-auto p-2 sm:p-4">
      <PagesGroup page={pageId} onPage={setPageId} />

      {lists.length === 0 ? (
        <h1 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6">
          You don't have any task groups yet
        </h1>
      ) : (
        <>
          <h1 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6">
            Your Task List
          </h1>

          {lists.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 italic">
              The list is empty
            </p>
          ) : (
            <div className="w-full space-y-3 sm:space-y-4 mt-4">
              {currentList &&
                currentList.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-2 flex flex-col gap-2 rounded-md ${
                      task.completed
                        ? 'bg-green-100 dark:bg-green-700/50 text-green-900 dark:text-green-200 line-through'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-full text-center font-bold text-sm sm:text-base">
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
                            className={`flex items-start justify-between bg-white dark:bg-gray-800 border rounded p-2 border-black/30 text-xs sm:text-sm ${
                              sub.completed
                                ? 'line-through bg-green-500/30 dark:text-green-200'
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
