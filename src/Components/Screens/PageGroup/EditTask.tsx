import Button from '@/Components/UI/Bottons/Button';
import Input from '@/Components/UI/Bottons/Input';
import Modal from '@/Components/UI/Modal';
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
  const [show, setShow] = useState<boolean>(false);
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
      <Button onClick={() => setShow(true)}>
        <Pencil className="w-4 h-4" />
      </Button>
      <Button
        variant="danger"
        onClick={() => {
          if (!id) return;
          manager.DeleteTask(id, taskId);
          update();
        }}
      >
        <Trash className="w-4 h-4" />
      </Button>
      {show && (
        <Modal
          title="Edit Task"
          onClose={() => {
            setShow(false);
          }}
          selectTitle="Close"
          onSelect={() => setShow(false)}
        >
          {task && (
            <>
              <Input
                label="Name Task"
                name="nameTask"
                value={task.name}
                onChange={(e) => {
                  setTask((prev) =>
                    prev ? { ...prev, name: e.target.value } : prev
                  );
                }}
              />
              {task.subTasks?.map((subTask) => (
                <Input
                  key={subTask.id}
                  label="Description"
                  name="description"
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
                  value={subTask.text}
                />
              ))}
            </>
          )}
        </Modal>
      )}
    </>
  );
}

export default EditTask;
