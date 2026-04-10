'use client';
import React from 'react';
import Block from './Block';

import CreateGroup from './CreateGroup';
import clsx from 'clsx';
import { useTodo } from '@/context/TodoContext';

function PagesGroup() {
  const { lists, manager, update, pageId, setPageId } = useTodo();
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="text-2xl font-bold">Your Groups</div>

      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-2 lg:grid-cols-3">
        {lists.map((list) => (
          <Block
            key={list.id}
            onClick={() => setPageId(list.id)}
            className={clsx(
              'col-auto',
              pageId === list.id
                ? 'border border-emerald-500 bg-emerald-200/70 text-emerald-900 shadow-md dark:border-emerald-400 dark:bg-emerald-600/50 dark:text-emerald-50'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
            onDelete={() => {
              manager.DeleteTodoList(list.id);
              update();
            }}
          >
            {list.nameGroup}
          </Block>
        ))}
        <CreateGroup
          onSubmit={(id) => {
            setPageId(id);
          }}
        />
      </div>
    </div>
  );
}

export default PagesGroup;
