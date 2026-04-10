import React, { useState } from 'react';
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
} from '@/components/ui';

type Props = {
  onSubmit: (id: number) => void;
};

function CreateGroup({ onSubmit }: Props) {
  const [tasks, setTasks] = useState<string[]>(['']);
  const [groupName, setGroupName] = useState('');
  const [taskName, setTaskName] = useState('');
  const { manager, update } = useTodo();
  const [open, setOpen] = useState(false);

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
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Create Task Group</Button>
        </DialogTrigger>

        <DialogContent aria-describedby={undefined} className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Task Group</DialogTitle>
          </DialogHeader>
          <form
            id="create-group-form"
            onSubmit={handleSubmit}
            className="max-h-[80vh] overflow-y-auto"
          >
            <FieldGroup className="px-2">
              <Field>
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                  id="groupName"
                  name="groupName"
                  value={groupName}
                  required
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </Field>
              <Field>
                <Label htmlFor="taskName">Task Name</Label>
                <Input
                  required
                  id="taskName"
                  name="taskName"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </Field>
              {tasks.map((task, index) => (
                <Field key={index}>
                  <Label htmlFor="description">Task Description</Label>
                  <Textarea
                    id="description"
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
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button form="create-group-form" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateGroup;
