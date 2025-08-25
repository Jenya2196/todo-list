import { tList, tTodoList } from '@/Types/typeTodoList';

class ListTodo {
  todoList: tTodoList[] = [];

  CreateTodoList(name: string) {
    const id = Date.now();
    this.todoList.push({ id, nameGroup: name, tasks: [] });
    this.Save();
    return id;
  }

  DeleteTodoList(listId: number) {
    console.log(this.todoList);
    this.todoList = this.todoList.filter((l) => l.id !== listId);
    this.Save();
    console.log(this.todoList);

    return this.todoList;
  }
  Load() {
    const data = localStorage.getItem('todoList');
    if (data) {
      this.todoList = JSON.parse(data) as tTodoList[];
    }
  }
  UpdateList(list: tTodoList[]) {
    this.todoList = list;
    localStorage.setItem('todoList', JSON.stringify(list));
  }

  Save() {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  GetLists() {
    return [...this.todoList];
  }
  GetTasks(listId: number) {
    const list = this.todoList.find((l) => l.id === listId);
    return list ? [...list.tasks] : [];
  }
}

class CTask extends ListTodo {
  constructor() {
    super();
  }

  CreateTask(listId: number, name: string, text?: string[]) {
    const list = this.todoList.find((l) => l.id === listId);
    if (!list) return;
    const id = Date.now();
    const data: tList[] = [];
    text?.map((elem, index) => {
      data.push({
        id: id + index + 1,
        text: elem,
        active: true,
        completed: false,
      });
    });
    const newTask = {
      id,
      name,
      active: true,
      completed: false,
      subTasks: data.length > 0 ? [...data] : undefined,
    };

    list.tasks.push(newTask);
    this.Save();
    return id;
  }
  AddTask(listId: number, taskId: number, text?: string[]) {
    const id = Date.now();
    const data: tList[] = [];
    text?.map((elem, index) => {
      data.push({
        id: id + index + 1,
        text: elem,
        active: true,
        completed: false,
      });
    });
    const list = this.todoList.find((l) => l.id === listId);
    if (!list) return;
    const task = list.tasks.find((t) => t.id === taskId);
    if (!task) return;

    if (!task.subTasks) task.subTasks = [];
    task.subTasks = [...(task.subTasks ?? []), ...data];
    this.Save();
    return { ...this.todoList };
  }

  DeleteTask(listId: number, taskId: number) {
    const list = this.todoList.find((l) => l.id === listId);
    if (!list) return;
    list.tasks = list.tasks.filter((t) => t.id !== taskId);
    this.Save();
    return { ...this.todoList };
  }
  DeleteSubTask(listId: number, taskId: number, subTaskId: number) {
    const list = this.todoList.find((l) => l.id === listId);
    if (!list) return;
    const task = list.tasks.find((t) => t.id === taskId);
    if (!task?.subTasks) return;
    task.subTasks = task.subTasks.filter((st) => st.id !== subTaskId);
    this.Save();
    return { ...this.todoList };
  }

  ToggleCompleted(listId: number, taskId: number, subTaskId?: number) {
    const list = this.todoList.find((l) => l.id === listId);
    if (!list) return;

    const task = list.tasks.find((t) => t.id === taskId);
    if (!task) return;

    if (subTaskId !== undefined && task.subTasks) {
      const subTask = task.subTasks.find((st) => st.id === subTaskId);
      if (!subTask) return;
      subTask.completed = !subTask.completed;
      subTask.active = !subTask.completed;
    } else {
      task.completed = !task.completed;
      task.active = !task.completed;
    }

    this.Save();
    return { ...this.todoList };
  }

  EditTask(listId: number, taskId: number, newName: string) {
    const list = this.todoList.find((l) => l.id === listId);
    if (!list) return;
    const task = list.tasks.find((t) => t.id === taskId);
    if (!task) return;
    task.name = newName;
    this.Save();
    return { ...this.todoList };
  }
  AddSubTask(listId: number, taskId: number, text: string) {
    const list = this.todoList.find((l) => l.id === listId);
    if (!list) return;
    const task = list.tasks.find((t) => t.id === taskId);
    if (!task) return;
    if (task.subTasks == undefined) task.subTasks = [];
    const id = Date.now();
    task.subTasks = [
      ...task.subTasks,
      { id: id, text, active: true, completed: false },
    ];

    this.Save();
    return { ...this.todoList };
  }
  EditSubTask(
    listId: number,
    taskId: number,
    subTaskId: number,
    newText: string
  ) {
    const list = this.todoList.find((l) => l.id === listId);
    if (!list) return;
    const task = list.tasks.find((t) => t.id === taskId);
    if (!task?.subTasks) return;
    const subTask = task.subTasks.find((st) => st.id === subTaskId);
    if (!subTask) return;
    subTask.text = newText;
    this.Save();
    return { ...this.todoList };
  }
}

export const todoList = new CTask();
