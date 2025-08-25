import Button from '@/Components/UI/Bottons/Button';
import Input from '@/Components/UI/Bottons/Input';
import Modal from '@/Components/UI/Modal';
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
        className="flex gap-2 items-center justify-center"
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
            <div className="flex justify-end mt-4 border-t p-2">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

export default AddTask;
