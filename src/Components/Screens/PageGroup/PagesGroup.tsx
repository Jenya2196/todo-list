'use client';
import React, { useState } from 'react';
import Block from './Block';
import Button from '@/Components/UI/Bottons/Button';
import CreateGroup from './CreateGroup';
import clsx from 'clsx';
import { useTodo } from '@/context/TodoContext';

interface Props {
  page: number | null;
  onPage: (id: number) => void;
}

function PagesGroup({ page, onPage }: Props) {
  const [modal, setModal] = useState<boolean>(false);
  const { lists, manager, update } = useTodo();

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-2xl font-bold">Your Groups</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {lists.map((list) => (
          <Block
            key={list.id}
            onClick={() => onPage(list.id)}
            className={clsx(
              'col-auto',
              page === list.id
                ? 'bg-emerald-200/70 border border-emerald-500 text-emerald-900 dark:bg-emerald-600/50 dark:border-emerald-400 dark:text-emerald-50 shadow-md'
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
        <Button onClick={() => setModal(true)}>Create Task Group</Button>
      </div>

      {modal && (
        <CreateGroup
          onSubmit={(id) => {
            onPage(id);
            setModal(false);
          }}
          onClose={() => setModal(false)}
        />
      )}
    </div>
  );
}

export default PagesGroup;
