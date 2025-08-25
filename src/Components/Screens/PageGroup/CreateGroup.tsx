import React, { useState } from 'react';
import Modal from '../../UI/Modal';
import Input from '../../UI/Bottons/Input';
import Button from '../../UI/Bottons/Button';
import { useTodo } from '@/context/TodoContext';

type Props = {
  onSubmit: (id: number) => void;
  onClose: () => void;
};

function CreateGroup({ onSubmit, onClose }: Props) {
  const [tasks, setTasks] = useState<string[]>(['']);
  const [groupName, setGroupName] = useState('');
  const [taskName, setTaskName] = useState('');
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
    if (!groupName.trim()) return;

    const id = manager.CreateTodoList(groupName);
    const taskId = manager.CreateTask(id, taskName);
    if (!taskId) return;

    const filteredTasks = tasks.filter((task) => task !== '');
    manager.AddTask(id, taskId, [...filteredTasks]);
    update();
    onSubmit(id);
  };

  return (
    <Modal title="Create Task Group" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Input
          label="Group Name"
          name="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />

        <div className="mt-2">
          <Input
            label="Task Name"
            name="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />

          {tasks.map((task, index) => (
            <Input
              key={index}
              name={`description`}
              label="Task Description"
              multiline
              value={task}
              onChange={(e) => handleChangeTask(index, e.target.value)}
            />
          ))}
        </div>

        <Button type="button" onClick={handleAddTask} className="mt-2">
          Add Task
        </Button>

        <div className="flex justify-end mt-4 border-t p-2">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateGroup;
