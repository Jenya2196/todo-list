'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { todoList } from '@/Utils/List';
import { tTodoList } from '@/Types/typeTodoList';

type TodoContextType = {
  lists: tTodoList[];
  pageId: number | null;
  setPageId: (value: number | null) => void;
  update: () => void;
  manager: typeof todoList;
};

const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, setLists] = useState<tTodoList[]>([]);
  const [pageId, setPageId] = useState<number | null>(null);

  const update = () => setLists(todoList.GetLists());

  useEffect(() => {
    todoList.Load();
    update();
    const ls = todoList.GetLists();
    if (ls.length > 0) {
      setPageId(ls[0].id);
    }
  }, []);

  return (
    <TodoContext.Provider
      value={{ lists, update, manager: todoList, pageId, setPageId }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodo must be used within TodoProvider');
  return ctx;
};
