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
import { useTodo } from '@/context/TodoContext';
import { tTask } from '@/Types/typeTodoList';
import { Pencil, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type Props = {
  id: number | null;
  taskId: number;
};

function EditTask({ id, taskId }: Props) {
  const { lists, manager, update } = useTodo();
  const [task, setTask] = useState<tTask | null>(null);

  useEffect(() => {
    const list = lists.find((list) => list.id === id);
    if (!list) return;
    const tasks = list.tasks.find((task) => task.id === taskId);
    if (!tasks) return;
    setTask(tasks);
  }, []);

  useEffect(() => {
    if (!id || !taskId || !task) return;
    manager.EditTask(id, taskId, task?.name);
    task.subTasks?.map((elem) => {
      manager.EditSubTask(id, taskId, elem.id, elem.text);
    });
    update();
  }, [task]);

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button>
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <FieldGroup className="max-h-[70vh] overflow-y-auto">
            {task && (
              <>
                <Field>
                  <Label htmlFor="nameTask">Name Task</Label>
                  <Input
                    id="nameTask"
                    value={task.name}
                    onChange={(e) => {
                      setTask((prev) =>
                        prev ? { ...prev, name: e.target.value } : prev
                      );
                    }}
                  />
                </Field>
                {task.subTasks?.map((subTask) => (
                  <Field>
                    <Label htmlFor="Description">Name Task</Label>
                    <Textarea
                      id="Description"
                      value={subTask.text}
                      onChange={(e) => {
                        setTask((prev) =>
                          prev
                            ? {
                                ...prev,
                                subTasks: !prev.subTasks
                                  ? []
                                  : prev.subTasks.map((s) =>
                                      s.id === subTask.id
                                        ? { ...s, text: e.target.value }
                                        : s
                                    ),
                              }
                            : prev
                        );
                      }}
                    />
                  </Field>
                ))}
              </>
            )}
          </FieldGroup>
          <DialogFooter>
            <DialogClose>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button
        variant={'destructive'}
        onClick={() => {
          if (!id) return;
          manager.DeleteTask(id, taskId);
          update();
        }}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </>
  );
}

export default EditTask;
