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
} from '@/components/ui';
import { useTodo } from '@/context/TodoContext';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';

type Props = {
  taskId: number;
};

function AddTask({ taskId }: Props) {
  const { manager, update, pageId } = useTodo();
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('description') as string;
    if (!taskId || pageId == null) return;
    manager.AddSubTask(pageId, taskId, name);
    update();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        setOpen(e);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <form
          id="Add_Task"
          className="max-h-[70vh] overflow-y-auto"
          onSubmit={handleSubmit}
        >
          <FieldGroup>
            <Field>
              <Label htmlFor="task_Description">Task Description</Label>
              <Input id="task_Description" name="description" required />
            </Field>
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button form="Add_Task" type="submit">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddTask;
