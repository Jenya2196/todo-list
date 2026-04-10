'use client';
import React from 'react';
import AddBlockTask from './AddBlockTask';
import PagesGroup from './PageGroup/PagesGroup';
import { useTodo } from '@/context/TodoContext';
import AddTask from './PageGroup/AddTask';
import EditTask from './PageGroup/EditTask';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Item,
  ItemActions,
  ItemContent,
} from '../ui';

function Main() {
  const { lists, manager, update, pageId } = useTodo();

  const currentList = lists.find((list) => list.id === pageId);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-2 p-2 sm:p-4">
      <PagesGroup />

      {!lists.length ? (
        <h1 className="mb-6 text-center text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
          You don't have any task groups yet
        </h1>
      ) : (
        <>
          <h1 className="mb-6 text-center text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
            Your Task List
          </h1>
        </>
      )}
      {currentList?.tasks.length === 0 ? (
        <>
          <p className="text-center text-gray-500 italic dark:text-gray-400">
            The list is empty
          </p>
          {pageId && <AddBlockTask />}
        </>
      ) : (
        <div className="mt-4 w-full space-y-3 sm:space-y-4">
          {currentList &&
            currentList.tasks.map((task) => (
              <Card key={task.id} className="w-full">
                <CardHeader>
                  <CardTitle>{task.name}</CardTitle>
                  <CardAction className="space-x-2">
                    <EditTask id={pageId} taskId={task.id} />
                  </CardAction>
                </CardHeader>
                <CardContent className="space-y-2">
                  {task.subTasks &&
                    task.subTasks.map((sub) => (
                      <Item
                        key={sub.id}
                        variant={!sub.completed ? 'outline' : 'muted'}
                      >
                        <ItemContent>
                          <div>{sub.text}</div>
                        </ItemContent>
                        <ItemActions>
                          <Checkbox
                            checked={sub.completed}
                            onCheckedChange={() => {
                              if (!pageId) return;

                              manager.ToggleCompleted(pageId, task.id, sub.id);
                              update();
                            }}
                          />
                        </ItemActions>
                      </Item>
                    ))}
                  <AddTask taskId={task.id} />
                </CardContent>
              </Card>
            ))}

          {pageId && <AddBlockTask />}
        </div>
      )}
    </div>
  );
}

export { Main };
