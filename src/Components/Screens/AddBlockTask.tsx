'use client';
import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { useTodo } from '@/context/TodoContext';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldGroup,
  Input,
  Label,
  Textarea,
} from '../ui';
import { Plus } from 'lucide-react';

function AddBlockTask() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [blockName, setBlockName] = useState<string>('');
  const [tasks, setTasks] = useState<string[]>(['']);
  const { manager, update, pageId } = useTodo();

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
    if (!blockName.trim() || !pageId) return;

    const taskId = manager.CreateTask(pageId, blockName);
    if (!taskId) return;

    const filteredTasks = tasks.filter((t) => t !== '');
    manager.AddTask(pageId, taskId, [...filteredTasks]);
    update();

    setShowModal(false);
    setBlockName('');
    setTasks(['']);
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add Task Block
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Task Block</DialogTitle>
        </DialogHeader>
        <form
          id="formAddTackBlock"
          className="max-h-[70vh] overflow-y-auto"
          onSubmit={handleSubmit}
        >
          <FieldGroup>
            <Field>
              <Label htmlFor="groupName">Block Name</Label>
              <Input
                id="groupName"
                name="groupName"
                required
                value={blockName}
                onChange={(e) => setBlockName(e.target.value)}
              />
            </Field>
            {tasks.map((task, index) => (
              <Field key={index}>
                <Label htmlFor="task_Description">Task Description</Label>
                <Textarea
                  id="task_Description"
                  name="description"
                  required
                  value={task}
                  onChange={(e) => handleChangeTask(index, e.target.value)}
                />
              </Field>
            ))}
            <Field>
              <Button type="button" onClick={handleAddTask} className="mt-2">
                Add Task
              </Button>
            </Field>
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button type="submit" form="formAddTackBlock">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddBlockTask;
