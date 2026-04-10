'use client';
import React, { useState } from 'react';
import Button from '../ui/Bottons/Button';
import Modal from '../ui/Modal';
import Input from '../ui/Bottons/Input';
import { useTodo } from '@/context/TodoContext';

type Props = {
  id: number;
};

function AddBlockTask({ id }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [blockName, setBlockName] = useState<string>('');
  const [tasks, setTasks] = useState<string[]>(['']);
  const { manager, update } = useTodo();

  const handleAddTask = () => {
    setTasks([...tasks, '']);
  };

  const handleChangeTask = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!blockName.trim()) return;

    const taskId = manager.CreateTask(id, blockName);
    if (!taskId) return;

    const filteredTasks = tasks.filter((t) => t !== '');
    manager.AddTask(id, taskId, [...filteredTasks]);
    update();

    setShowModal(false);
    setBlockName('');
    setTasks(['']);
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Add Task Block</Button>

      {showModal && (
        <Modal onSelect={() => {}} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit}>
            <Input
              label="Block Name"
              name="groupName"
              value={blockName}
              onChange={(e) => setBlockName(e.target.value)}
            />

            {tasks.map((task, index) => (
              <Input
                key={index}
                name="description"
                value={task}
                label="Task Description"
                multiline
                onChange={(e) => handleChangeTask(index, e.target.value)}
              />
            ))}

            <Button type="button" onClick={handleAddTask} className="mt-2">
              Add Task
            </Button>

            <div className="mt-4 flex justify-end">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

export default AddBlockTask;
