'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { todoList } from '@/Utils/List';
import { tTodoList } from '@/Types/typeTodoList';

type TodoContextType = {
  lists: tTodoList[];
  update: () => void;
  manager: typeof todoList;
};

const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, setLists] = useState<tTodoList[]>([]);

  const update = () => setLists(todoList.GetLists());

  useEffect(() => {
    todoList.Load();
    update();
  }, []);

  return (
    <TodoContext.Provider value={{ lists, update, manager: todoList }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodo must be used within TodoProvider');
  return ctx;
};
