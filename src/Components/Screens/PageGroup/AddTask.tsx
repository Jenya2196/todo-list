import Button from '@/Components/UI/Bottons/Button';
import Input from '@/Components/UI/Bottons/Input';
import Modal from '@/components/ui/Modal';
import { useTodo } from '@/context/TodoContext';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';

type Props = {
  id: number | null;
  taskId: number;
};

function AddTask({ id, taskId }: Props) {
  const { manager, update } = useTodo();
  const [show, setShow] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('description') as string;
    if (!taskId || id == null) return;
    manager.AddSubTask(id, taskId, name);
    update();
    setShow(false);
  };

  return (
    <>
      <Button
        className="flex items-center justify-center gap-2"
        onClick={() => {
          setShow(true);
        }}
      >
        <Plus /> Add Task
      </Button>
      {show && (
        <Modal title="Add Task" onClose={() => setShow(false)}>
          <form onSubmit={handleSubmit}>
            <Input label="Task Description" name="description" required />
            <div className="mt-4 flex justify-end border-t p-2">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

export default AddTask;
